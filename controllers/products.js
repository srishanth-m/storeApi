const Product = require('../models/product.js')

const getAllProductsStatic = async (req, res) => {
  const search = 'a'
  const products = await Product.find({
    name : {$regex : search , $options : 'i'}
  })
  res.status(200).json({ products , nbHits : products.length });
};

const getAllProducts = async (req, res) => {
  const {featured , company , name , sort , fields} = req.query
  const queryObject = {}

  if(featured){
    queryObject.featured = featured === 'true' ? true : false
  }

  if(company){
    queryObject.company = company
  }

  if(name){
    queryObject.name = {$regex : name , $options : 'i'}
  }

  console.log(queryObject)
  let result = Product.find(queryObject)
  if(sort){
    const sortSplit = sort.split(',').join(' ')
    result = result.sort(sortSplit)
  }else{
    result = result.sort('createdAt')
  }

  if(fields){
    const fieldSplit = fields.split(',').join(' ')
    result = result.select(fieldSplit)
  }


  const page = Number(req.quer.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  
  const products = await result

  res.status(200).json({ products , nbHits : products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
