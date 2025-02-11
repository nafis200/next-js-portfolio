"use client";
import Blogsfetch from "@/utils/actions/Blogsfetch";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Zoom } from "react-awesome-reveal";
import Link from "next/link";

interface ProjectData {
  _id: string;
  image: string;
  title: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AllUpdatePage = () => {
  const [project, setProject] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      const data = await Blogsfetch();
      setProject(data);
      setLoading(false);
    };

    getProject();
  }, []);

  if (loading) return <p>Loading project...</p>;

  return (
    <div>
      <h1>..</h1>
      <h1 className="mt-20">..</h1>
      {project?.map((proj, index) => (
        <Zoom key={index}>
          <div className="w-full mx-auto shadow-lg rounded-lg overflow-hidden p-4 flex flex-col md:flex-row items-center gap-20 space-y-5">
            <Image
              src={proj?.image}
              alt={proj?.title}
              width={150}
              height={150}
              className="w-36 h-36 object-cover rounded-md"
            />
             <div className="flex-1">
              <h2 className="text-xl font-bold">{proj.title}</h2>
              <p className="mt-2 text-sm">{proj.description}</p>
            <Link
              href={`${`update/${proj._id}`}`}
              className="text-blue-500 hover:text-blue-700 mt-2"
            >
              Update
            </Link>
            </div>
          </div>
        </Zoom>
      ))}
    </div>
  );
};

export default AllUpdatePage;
