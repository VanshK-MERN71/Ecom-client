import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden bg-[#FAFAFA] border-gray-100/80 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
      <div>
        <div className="relative image-zoom">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2 truncate">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            className="rounded-lg btn-press"
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)} className="rounded-lg btn-press">Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
