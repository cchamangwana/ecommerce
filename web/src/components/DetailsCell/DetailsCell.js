import { formatDateToNow } from 'src/utils/formatDate'
import AddToCart from '../AddToCart/AddToCart'
import RemoveFromCart from '../RemoveFromCart/RemoveFromCart'

export const QUERY = gql`
  query productQuery($id: String!) {
    product(id: $id) {
      id
      name
      description
      price
      image
      category {
        id
        name
      }
      reviews {
        id
        text
        createdAt
        user {
          id
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ product }) => {
  const { reviews } = product
  console.log(product)
  return (
    <section className="text-gray-400 body-font overflow-hidden">
      <div className="px-1 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.name}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={product.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-black tracking-widest">
              {product.category.name}
            </h2>
            <h1 className="text-black text-3xl title-font font-medium mb-8">
              {product.name}
            </h1>
            <p className="leading-relaxed">
              {product.description_long}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages.
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5"></div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-black">
                K{product.price}
              </span>
              <AddToCart product={product} />
              <RemoveFromCart product={product} />
            </div>
            <div className="flex items-center justify-center mb-4 max-w-lg">
              <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                <div className="flex flex-wrap mt-3 -mx-3 mb-6">
                  <div className="w-full md:w-full px-3 mb-2 mt-2">
                    <textarea
                      className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-15 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                      name="body"
                      placeholder="Type Your Comment"
                      required
                    ></textarea>
                  </div>
                  <div className="w-fullflex items-start md:w-full px-3">
                    <div className="-mr-1">
                      <input
                        type="submit"
                        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                        value="Post Comment"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:w-4/5 mx-auto">
          <h1 className="pt-5 text-gray-700 text-3xl title-font font-medium">
            Comments
          </h1>
          {reviews.map((review) => {
            return (
              <>
              <div className="bg-gray-100 p-3 mb-3">
                <p key={review.id} className="text-black text-xl">
                  {review.user.name} said {review.text}{' '}
                </p>
                <p style={{ zoom: 0.9 }}>
                   {formatDateToNow(review.createdAt)}
                </p>
              </div>
              </>
            )
          })}
        </div>
      </div>
    </section>
  )
}
