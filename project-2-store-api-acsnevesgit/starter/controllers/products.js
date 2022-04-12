const Product = require('../models/product');

// -------*--------*-------- STATIC APPROACH -------*--------*--------
// We will use this just to test 1-by-1, e.g. giving the hardcored values
// since it is easier to test
const getAllProductsStatic = async (req, res) => {
    const search = 'a';
    // const products = await Product.find({}).sort('-name price');
    const products = await Product.find({ price: { $gt: 30 } })
        .sort('price')
        .select('name price')
        .limit(10)
        .skip(2);

    // throw new Error('testing async errors');
    res.status(200).json({ products, nbHits: products.length });
};

// -------*--------*-------- DYNAMIC APPROACH -------*--------*--------
// The actual route we will use in the fuctionality
const getAllProducts = async (req, res) => {
    // But what happens if we ask for the match of a property that does not exist in the DB?
    // Instead of passing directly req.query, we set up a new object and first we just pull out
    // the properties we are interested. Second we check if the property is actually coming in with the request.
    // If yes, then we set that new property in the queryObject
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};

    // If featured is true that I want to set a new property in this new queryObject
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    };
    if (company) {
        queryObject.company = company === 'true' ? true : false;
    };
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    };
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(<|>|=|<=|>=)\b/g;
        // If there is a match, then we convert the user-firendly signs (left side) 
        // to the ones that Mongoose undertands (right side)
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`);

        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            };
        });
    };

    // console.log(filters);
    console.log(queryObject);
    // console.log(req.query);

    // Now we will directly pass req.query
    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' '); // Split the elements of the array on commas and then join the elements again
        result = result.sort(sortList);
        // products = products.sort();

    } else {
        result = result.sort('createAt');
    };

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    };

    const page = Number(req.query.page) || 1; // If the user does not pass page to the query
    const limit = Number(req.query.limit) || 10; // If the user does not pass limit to the query
    const skip = (page - 1) * limit; // e.g. if we have page=1, then we will skip the skip

    // Now we need to chain the skip to the result
    result = result.skip(skip).limit(limit);

    // Only at the very bottom, after sorting, we will get the product
    // We only set the await once we have the complete result
    const products = await result;

    res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };