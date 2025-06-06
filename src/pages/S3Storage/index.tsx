import { useEffect, useState } from "react";
import S3AWSApi from "../../libs/S3AWSApi";
import Loading from "../../components/Loading";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FileS3Response } from "../../types/APIModel";
import Swal from "sweetalert2";
import { ROUTES } from "../../constants/routes";

export default function S3Storage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lstFiles, setLstFiles] = useState<FileS3Response[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchFiles = async () => {
      try {
        const response = await S3AWSApi.getFileBucket();
        console.log("Fetched files:", response);
        setLstFiles(response);
      } catch (error) {
        Swal.fire({
          title: "Đã có lỗi xảy ra",
          icon: "error",
          confirmButtonText: "Quay về",
          preConfirm: () => {
            window.location.href = ROUTES.DASHBOARD;
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);
  return (
    <div>
      <>
        <div className="w-full container max-w-5xl mx-auto my-8 flex flex-col items-center gap-8 p-8">
          <h1 className="w-full text-center text-white text-3xl">
            S3 Storage Bucket
          </h1>
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <div className="w-full py-3 flex flex-col gap-4 ">
              {lstFiles.map((file, index) => {
                return (
                  <div
                    key={index}
                    className="w-full py-3 sm:py-4 px-4 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="shrink-0 ">
                        <FontAwesomeIcon
                          icon={faFile}
                          color="white"
                          size="xl"
                        ></FontAwesomeIcon>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium truncate text-white">
                          FileName: {file.key}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Size: {file.size}KB
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Date:{" "}
                          {new Date(file.lastModified).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold">
                        <a
                          href={file.url}
                          target="_blank"
                          className="bg-white px-4 py-1 rounded-md "
                        >
                          Xem
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    </div>
  );
}
