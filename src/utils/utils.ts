import { CartItemProps } from "@/app/redux/slices/cartSlice";
import { deleteUser } from "@/lib/actions/authActions";
import { deleteProduct } from "@/lib/actions/productActions";
import Swal from "sweetalert2";

export const formatDate = (date: Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

export const getFilteredAndPaginatedData = (
  data: any[],
  searchTerm: string,
  currentPage: number,
  pageSize: number,
  searchFields: string[],
) => {
  const filteredData = data.filter((item) =>
    searchFields.some((field) =>
      item[field].toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      return currentPage + 1;
    }
    return currentPage;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      return currentPage - 1;
    }
    return currentPage;
  };

  return { paginatedData, totalPages, handleNext, handlePrevious };
};

type EntityType = "user" | "product";

export const handleDelete = async (
  entityId: number,
  entityType: EntityType,
  router?: any,
) => {
  const confirmed = await confirmWithNotification();

  try {
    if (entityType === "user") {
      if (confirmed.isConfirmed) {
        const response = await deleteUser(entityId);
        Swal.fire({
          icon: response.status === "success" ? "success" : "error",
          title: response.status === "success" ? "Success" : "error",
          text: response.message,
          confirmButtonText: "OK",
        }).then(() => router?.refresh());
      }
    } else if (entityType === "product") {
      if (confirmed.isConfirmed) {
        const response = await deleteProduct(entityId);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message,
          confirmButtonText: "OK",
        }).then(() => router?.refresh());
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Xóa thất bại, vui lòng thử lại sau",
      confirmButtonText: "OK",
    });
  }
};

export const calculateTotal = (items: CartItemProps[]): number => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

export const confirmWithNotification = (message?: string) => {
  const confirmResult = Swal.fire({
    title: "Confirm",
    text: message || "Do you want to confirm your change?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  return confirmResult;
};
