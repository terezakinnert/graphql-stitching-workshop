/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// WORKSHOP: 
// first thing that happens: gatsby config runs and looks for all the sources
// if sourcing local files only (md, yml), there is easier way to do this: enable mapping in gatsby-config ('post.authors.name')

// allows us to add another field 
// my product field would map to moltin product type, fetch all the M.products, filter through GCMS, look at what matches, 
// for every SKU that matches
// but you can't modify types in a remote API 

// WORK AROUND: 
// create a new field 

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GCMS_Post: {
      mo_products: { // this is a new field 
        // resolves to the field 'MoltinProduct' node; expecting to receive that 
        type: ['MoltinProduct'], 
        resolve: (source, args, context, info) => {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                sku: {
                  in: source.products,
                },
              },
            },
            type: "MoltinProduct",
            firstOnly: false
          })
        }
      }
    }
  }
  createResolvers(resolvers)
}


// exports.createResolvers = ({ createResolvers }) => {
//   const resolvers = {}

//   createResolvers(resolvers)
// }