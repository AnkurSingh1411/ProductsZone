const Product = require ('../models/productmodel')
const productroute = require("../routes/product")
// Showing the list of Products 

const Productslist = async (req,res,next)=>{
   
    try {
    const jk = await Product.find()
    return res.json(jk)
   }
    catch(err){
        res.json('An error occured :'+err)
    }
}

// Showing a Single product by id 
 
const GetProductById = (req,res,next)=>{
    try{
    let prodid = req.body.prodid
    const ans = Product.findById(prodid)
    res.json(ans)
    }
    catch (err){
        res.send("An error Occured : "+ err)
    }
}


// For Logged-in users 

const AddUserProduct = ( async (req,res,next)=>{
    try{
        const prodid = req.token_data._id
        console.log("hello",prodid)
        const New = await Product.findById({_id:prodid})
        
        if(!New){
            let newproduct = await new Product ({
                userId : prodid,
                name : req.body.name,
                category : req.body.category,
                price : req.body.price,

            })
            console.log(req.file)
            const ann = newproduct.save()
            res.send("product added successfully"+ann)
            console.log(prodid+'has updated a new product')
        
        }
    
    }
    catch(err){
        res.send("An error Occured :" + err)

    }
}

)
// get product by id

const GetUserProduct = async (req,res,next)=>{
    try{
    // const prodbyid = req.params._id
    // const naya = await Product.findById(prodbyid)
    const prodbyid = req.token_data._id
    console.log(prodbyid)
    const New = await Product.find({userId:prodbyid})
    console.log(New);
    return res.send(New)
    
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
        const New = await Product.findOne({name:prodname})
        if (New){
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

// This api includes user roles

const AddNewProduct = (async(req,res,next)=>{
    try{
    const addproducts= new Product ({
        name : req.body.name,
        category : req.body.category,
        price : req.body.price
    })
    const addedprod = await addproducts.save()
    res.json("your products added succesfully"+ addedprod)
}catch (err){
    res.json("ops you got an err  : "+err)
}    
})
module.exports={
    Productslist,
    GetUserProduct,
    AddUserProduct,
    UpdateProductById,
    DeleteProduct,
    GetProductById,
    AddNewProduct
}
