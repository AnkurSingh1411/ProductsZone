const Product = require ('../models/productmodel')
const multer = require('multer')
const upload = multer({dest:'uploads/'})
// Showing the list of Products 

const Productslist = async (req,res,next)=>{
   
    try {
        
    //  const prod = Product.find()
    //  res.send(prod)

    const jk = await Product.find()
    return res.json(jk)
   }
    catch(err){
        res.json('An error occured :'+err)
    }
}

// Showing a Single product by id 
 
const ProductById = (req,res,next)=>{
    try{
    let prodid = req.body.prodid
    const ans = Product.findById(prodid)
    res.json(ans)
    }
    catch (err){
        res.send("An error Occured : "+ err)
    }
}

// Add a product to database

const AddProduct = (upload.single('productImage'), async (req,res,next)=>{
    try{
        const prodid = req.token_data._id
        console.log("hello",prodid)
        const naya = await Product.findById({_id:prodid})
        
        if(!naya){
            let newproduct = await new Product ({
                userId : prodid,
                name : req.body.name,
                category : req.body.category,
                price : req.body.price
            })
            const ann = newproduct.save()
            res.send("product added successfully"+ann)
            console.log(prodid+" has updated a product")
        
        }
    //     let newproduct = new Product ({
    //         name : req.body.name,
    //         category : req.body.category,
    //         price : req.body.price
    //     })
    //     const ann = newproduct.save()
    //     res.send("product added successfully")
    //     console.log("product added successfully")
    }
    catch(err){
        res.send("An error Occured :" + err)

    }
}
// get product by id
)
const GetProductById = async (req,res,next)=>{
    try{
    // const prodbyid = req.params._id
    // const naya = await Product.findById(prodbyid)
    const prodbyid = req.token_data._id
    console.log(prodbyid)
    const naya = await Product.find({userId:prodbyid})
    return res.send(naya)
    }
    catch(err) {
        res.send("Ops an error occured : "+err)
    }
}


// Update a product by its Id 

const UpdateProductById = (req,res,next)=>{
    try{
        let productid = req.body.productid

        let updateddata = {
            name : req.body.name,
            category : req.body.category,
            price : req.body.price 
        }
        const updata= Product.findByIdAndUpdate(productid,{$set : updateddata})
        res.json(updata) 
        console.log("data has been updated")

    }
    catch(err){
        res.send('An error occured :'+err)
    }

}

// Delete a product by id

const DeleteProduct = async (req,res,next)=>{
    try{
        const prodname = req.token_data.name
        const naya = await Product.findOne({name:prodname})
        if (naya){
        let ProdId = req.body.name
        Product.findOneAndRemove(ProdId)
        res.send("product deleted successsfully !")
        console.log(prodname + "has deleted the product")

        }
        

    }
    catch(err){
        res.send('Ops something went wrong : '+err)

    }
}

module.exports={
    Productslist,
    ProductById,
    AddProduct,
    UpdateProductById,
    DeleteProduct,
    GetProductById
}
