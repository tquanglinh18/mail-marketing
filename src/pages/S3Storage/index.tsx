import { useEffect, useState } from "react";
import S3AWSApi from "../../libs/S3AWSApi";
import Loading from "../../components/Loading";
import type { FileS3Response } from "../../types/APIModel";

export default function S3Storage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lstFiles, setLstFiles] = useState<FileS3Response[]>([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchFiles = async () => {
      try {
        const response = await S3AWSApi.getFileBucket();
        console.log("Fetched files:", response);
        setLstFiles(response);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);
  return (
    <div>
      <>
        <div className="w-full container mx-auto my-8 flex flex-col items-center gap-8 p-8">
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
                      <div className="shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRM2-AldpZgaraCXCnO5loktGi0wGiNPydQ&s"
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium truncate text-white">
                          Key: {file.key}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Size: {file.size}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Date: {file.lastModified}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold">
                        <a href={file.url} target="_blank">
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
