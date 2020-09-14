
const Company = require("../models/company");

exports.getCompanies = (req, res, next) => {

  Company.find()
  .then(companies => {
      res.status(200).json({
        message: "Companies Fetched Successfully!",
        companies: companies
      })
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching Companies Failed!"
    });
  });
}


exports.getCompaniesByUser = (req, res, next) => {

  Company.find({creator: req.params.id})
  .then(companies => {


    if(companies)
    {
      res.status(200).json({
        message: "Companies Fetched Successfully!",
        companies: companies
      })
    }else{
      res.status(404).json({message: "Companies Not Found"});
    }

  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching Companies Failed!"
    });
  });
}

exports.getCompany = (req, res, next) => {
Company.findById(req.params.id).then(company => {

  if(company)
  {

    res.status(200).json(company);
  }else{
    res.status(404).json({message: "Company Not Found"});
  }
})
.catch(error => {
  res.status(500).json({
    message: "Fetching Post Failed!"
  });
});
}

exports.createCompany = (req, res, next) => {


  const url = req.protocol + "://" + req.get("host");
  const company = new Company({
    name: req.body.name,
    email: req.body.email,
    website: req.body.website,
    domicile: req.body.domicile,
    founding_date: req.body.founding_date,
    ibin: req.body.ibin,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });

  company.save()
  .then(createdCompany => {
    res.status(201).json({
      message: "Company Created Successfully",
      company: {
        ...createdCompany,
        id: createdCompany._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Failed to save company!"
    });
  });
};

exports.updateCompany = (req, res, next) => {
let imagePath = req.body.imagePath;

if(req.file)
{
  const url = req.protocol + "://" + req.get("host");
  imagePath = url + "/images/" + req.file.filename;
}

const company = new Company({
  _id: req.body.id,
  name: req.body.name,
  website: req.body.website,
  email: req.body.email,
  ibin: req.body.ibin,
  founding_date: req.body.founding_date,
  imagePath: imagePath,
  domicile: req.body.domicile,
  creator: req.userData.userId
});

//check if creator user id before editing company
Company.updateOne({_id: req.params.id, creator: req.userData.userId}, company)
.then(result => {
  if(result.nModified > 0)
  {
    res.status(200).json({message: "Updated Successfully!", company: company});
  }else{
    res.status(401).json({message: "Not Authorized"});
  }
})
.catch(error => {
  res.status(500).json({
    message: "Couldnt update posts"
  });
})
};
