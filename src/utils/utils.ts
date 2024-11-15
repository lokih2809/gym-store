import { CartItemProps } from "@/app/redux/slices/cartSlice";
import Swal from "sweetalert2";

// Format date
export const formatDate = (date: Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

// Get Filter and Paginate data
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

// Calculate Total
export const calculateTotal = (items: CartItemProps[]): number => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

// Notification confirm form
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

type ShowNotificationProps = {
  response: { status: string; message: string };
  thenSuccess?: () => void;
};

const showSwalNotification = (
  icon: "success" | "error",
  title: string,
  message: string,
) => {
  return Swal.fire({
    icon,
    title,
    text: message,
    confirmButtonText: "OK",
  });
};

export const showNotification = async ({
  response,
  thenSuccess,
}: ShowNotificationProps) => {
  const icon = response.status === "success" ? "success" : "error";
  const title = response.status === "success" ? "Thành công" : "Thất bại";
  const defaultMessage =
    response.status === "success"
      ? "Cập nhật thành công."
      : "Có lỗi xảy ra, vui lòng thử lại sau.";

  await showSwalNotification(icon, title, response.message || defaultMessage);

  if (response.status === "success" && thenSuccess) {
    thenSuccess();
  }
};

export const catchErrorSystem = () => {
  showSwalNotification(
    "error",
    "Thất bại",
    "Có lỗi xảy ra, vui lòng thử lại sau.",
  );
};
