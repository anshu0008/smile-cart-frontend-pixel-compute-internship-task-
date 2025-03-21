import Confetti from "react-confetti";
import routes from "src/Route";

const OrderSuccess = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Confetti height={height} width={width} />
      <h1 className="text-4xl font-bold">
        🎉 Yay, your order has been placed!
      </h1>
      <p className="mt-2 text-2xl text-green-400">
        Thank you for shopping with us!
      </p>
      <img
        alt="Celebration"
        className="mt-6 h-auto w-auto rounded-lg"
        src="https://i.pinimg.com/originals/66/ed/c3/66edc3c20673625330440ba6e8f2374a.gif"
      />
      <button
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-xl font-bold text-white shadow-md transition hover:bg-blue-700"
        onClick={() => (window.location.href = routes.products.home)}
      >
        🎊 Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
