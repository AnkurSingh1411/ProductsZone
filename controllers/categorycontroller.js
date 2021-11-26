const slugify = require('slugify')
const Category = require ('../models/category')
exports.addCategory = (req,res)=>{

    const CategoryObj = {
        name : req.body.name,
        slug : slugify (req.body.name)
    }
    if (req.body.parentId){
        CategoryObj.parentId = req.body.parentId
    }
    const cat =  new Category(CategoryObj);
    cat.save((error,category)=>{
        if (error ) return res.status(400).json({error}) 
        if (category){
            return res.status(201).json({category})
        }
    })
}

function createCategories (categories , parentId=null){
    const categoryList = [];
    let category;
    if (parentId==null){
        category= categories.filter(cat=>cat.parentId==undefined)
    }else{
        category = categories.filter(cat=>cat.parentId == parentId)
    }
    for (let cate of category){
       categoryList.push({
           _id : cate._id,
           name : cate.name,
           slug : cate.slug,
           childern : createCategories(categories,cate._id)

       })
    } 
    return categoryList
}

exports.findCategories = (req,res)=>{
    Category.find({})
    .exec((err,categories)=>{
        if (err) return res.status(400).json({err})
        if (categories) {
            const categoryList = createCategories(categories);
            res.status(200).json(categoryList)
        }
    })
}