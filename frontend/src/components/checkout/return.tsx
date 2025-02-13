import { useSearchParams, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import ThankYou from "../../../public/thank-you.jpeg";

const CheckoutReturnPage: FC = () => {
  sessionStorage.removeItem("formData");
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const [paymentId, setPaymentId] = useState<string>("");

  useEffect(() => {
    if (!sessionId) {
      navigate("/checkout"); // Redirect to homepage if no session_id is found
    }

    const getSession = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/session-status?session_id=${sessionId}`,
        {
          method: "GET",
        }
      );
      const { payment_id } = await res.json();
      setPaymentId(payment_id);
    };
    getSession();
  }, [sessionId, navigate]);

  return (
    <>
      <div className="flex flex-col gap-12 md:gap-4 border-2 rounded-xl mx-auto my-12 p-4 md:p-12  md:w-[1000px]">
        <img alt="Thank you for your purchase" src={ThankYou} />
        <p className="md:text-xl text-4xl">
          Your payment has successfully been processed and your order placed.
        </p>
        <p className="md:text-xl text-4xl">
          Payment ID: <span className="font-bold">{paymentId}</span>
        </p>
        <p className="md:text-xl text-4xl">
          We estimate your Diamedic card will arrive between 3 and 5 working
          days, however we'll update you if anything changes.
        </p>
        <p className="md:text-xl text-3xl">
          If you have any problems or concerns, please contact{" "}
          <a href="mailto:calum@diamedic.co.uk" className="text-blue-500">
            calum@diamedic.co.uk
          </a>{" "}
          and quote the above payment ID, and we'll do our best to resolve any
          problems.
        </p>
      </div>
    </>
  );
};

export default CheckoutReturnPage;
