import { useSearchParams, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import ThankYou from "../../../public/thank-you.jpeg";
import { Link } from "@mui/material";

const CheckoutReturnPage: FC = () => {
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
      <div className="flex flex-col gap-12 md:gap-4 border-2 rounded-xl mx-auto my-12 p-12 md:w-[1000px]">
        <img
          alt="Thank you for your purchase"
          src={ThankYou}
          //   height={isMobile ? 600 : 300}
          //   width={isMobile ? 600 : 300}
        />
        <p className="md:text-xl text-5xl">
          Your payment has successfully been processed and your order placed.
        </p>
        <p className="md:text-xl text-4xl">
          Payment ID: <span className="font-bold">{paymentId}</span>
        </p>
        <p className="md:text-xl text-4xl">
          We estimate your Diamedic card will arrive between 3 and 5 working
          days, however we'll update you if anything changes.
        </p>
        <p className="md:text-xl text-4xl">
          If you have any problems or concerns, please contact{" "}
          <Link
            href="mailto:calum@diamedic.co.uk"
            variant="h6"
            color="primary"
            underline="hover"
          >
            calum@diamedic.co.uk
          </Link>{" "}
          and quote the above payment ID, and we'll do our best to resolve any
          problems.
        </p>
      </div>
    </>
  );
};

export default CheckoutReturnPage;
