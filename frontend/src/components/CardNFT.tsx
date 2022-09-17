import app from "config/app";
import { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import { TrashIcon } from "@heroicons/react/outline";
import axios from "../axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { useAuth } from "contexts/AuthContext";

export interface CardNFTProps {
  className?: string;
  isLiked?: boolean;
  admin?: boolean;
  product?: any;
  setProducts?: any;
}

const CardNFT: FC<CardNFTProps> = ({
  product,
  className = "",
  isLiked,
  admin,
  setProducts,
}) => {
  const passNotPass = ["Pass.png", "NotPass.png", "UnableToVerify.png"];
  const badge = passNotPass[Math.floor(Math.random() * passNotPass.length)];
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const history = useHistory();

  const buttonClickHandler = () => {
    history.push("/update-item?id=" + product?._id);
  };

  const deleteHandler = async (id: any) => {
    setLoading(true);
    await axios
      .delete("/products/" + id, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((resp: any) => {
        setLoading(false);
        toast.success(resp.data.message);
        setProducts((prev: any) => prev.filter((item: any) => item._id !== id));
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(
          err.response?.data ? err.response?.data?.message : err.message
        );
      });
  };

  return (
    <div
      className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardNFT"
      style={{ position: "relative" }}
    >
      <div className="relative flex-shrink-0 ">
        <div>
          <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
            // src={nftsImgs[Math.floor(Math.random() * nftsImgs.length)]}
            src={`${app.serverURL}/assets/images/${product?.images?.[0]?.image}`}
            className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          />
        </div>

        <div className="absolute top-3 inset-x-3 flex"></div>
      </div>

      <div className="p-4 py-5 space-y-3">
        <p className="ml-1 mt-0.5">
          {"#" + product?._id ||
            `STF #${Math.floor(Math.random() * 1000) + 1000}`}
        </p>

        <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>

        <div
          className="flex justify-between items-center "
          style={{ height: "60px" }}
        >
          <h2 className={`text-lg font-medium`}>
            {product?.title || "Nike dunk syracus"}
          </h2>
          {product.status && (
            <img
              src={
                "/badge-pass-not-pass/" +
                (product?.status === "Pass"
                  ? passNotPass[0]
                  : product?.status === "Not Pass"
                  ? passNotPass[1]
                  : passNotPass[2])
              }
              alt=""
              style={{
                width: "80px",
                height: "80px",
                // position: "absolute",
                // bottom: 8,
                // right: 10,
              }}
            />
          )}

          {/* <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            <ClockIcon className="w-4 h-4" />
            <span className="ml-1 mt-0.5">
              {Math.floor(Math.random() * 20) + 1} hours left
            </span>
          </div> */}
        </div>
      </div>

      <div></div>
      {admin ? (
        <div className="flex items-center justify-between mb-5 px-4">
          <ButtonPrimary onClick={buttonClickHandler}>
            Legit-Check
          </ButtonPrimary>
          {loading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <div
              style={{ cursor: "pointer" }}
              onClick={deleteHandler.bind(this, product?._id)}
            >
              <TrashIcon width={24} height={24} color="red" />
            </div>
          )}
        </div>
      ) : (
        <Link
          to={"/nft-detailt?id=" + product?._id}
          className="absolute inset-0"
        ></Link>
      )}
    </div>
  );
};

export default CardNFT;
