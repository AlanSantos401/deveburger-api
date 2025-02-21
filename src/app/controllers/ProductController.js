 import * as Yup from 'yup';
import Product from '../models/Product.js';
  
 class ProductController {
    async store(req, res) {
       const schema = Yup.object({
          name: Yup.string().required(),
          price: Yup.string().required(),
          category: Yup.string().required(),
        });

        try {
            schema.validateSync(req.body, {abortEarly: false});
           } catch (err) {
            return res.status(400).json({ error: err.errors});
        }

        const { filename: path } = req.file;
        const { name, price, category } = req.body;

        const product = await Product.create({
         name,
         price,
         category,
         path,
        })

        return res.status(201).json(product);

    }
 }

 export default new ProductController();