"use client";
import { useState, useEffect } from "react";
import { Upload, Form, Input, Button, List } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";

interface Photo {
  id: number;
  imageUrl: string;
  comments: Comment[];
}
interface Comment {
  id: number;
  content: string;
}
type Valid = {
  type: string;
  message: string;
};
export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [valid, setValid] = useState<Valid>({
    type: "",
    message: "",
  });

  const fetchPhotos = async () => {
    const response = await fetch("/api/photos");
    const data = await response.json();
    setPhotos(data);
  };
  const handleUploadImageChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmitComment = async (photoId: number, content: string) => {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoId, content }),
    });

    if (response.ok) fetchPhotos();
  };

  const handleSubmitUploadImage = async (values: any) => {
    if (values.photo) {
      const formData = new FormData();
      formData.append("file", values.photo.fileList[0].originFileObj);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setFileList([]);
          setValid({ type: "success", message: "Upload Photo Success" });
          fetchPhotos();
        } else {
        }
      } catch (error) {
        setValid({ type: "error", message: "*Error uploading photo" });
      }
    } else setValid({ type: "error", message: "*Please select photo" });
  };
  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <div className="text-center my-5 text-xl font-bold">Photo App - Upload Your Photo</div>
      <Form
        onFinish={handleSubmitUploadImage}
        style={{ paddingBlock: 10, display: "flex", alignItems: "center" }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}>
        <Form.Item name="photo" wrapperCol={{ offset: 6 }}>
          <Upload beforeUpload={() => false} fileList={fileList} onChange={handleUploadImageChange}>
            <Button icon={<UploadOutlined />}>Select Your Photo</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="photo" wrapperCol={{ offset: 6 }}>
          <div className={`${valid.type === "error" ? "text-red-500" : "text-green-500"}`}>{valid.message}</div>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }} style={{ paddingBlock: 10, marginLeft: "2rem" }}>
          <Button type="primary" htmlType="submit">
            Upload
          </Button>
        </Form.Item>
      </Form>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={photos}
        renderItem={(photo) => (
          <List.Item>
            <div className=" border rounded p-2 ">
              <div className="flex">
                <div className="w-[200px] h-[200px] relative">
                  <Image
                    src={photo.imageUrl}
                    alt="Uploaded photo"
                    style={{ objectFit: "cover" }}
                    fill
                    className="rounded"
                    sizes="100vw"
                  />
                </div>
                <div className="ml-8 text-center ">
                  <div className="text-lg font-semibold">
                    <h1>Comments of photo</h1>
                  </div>
                  <List
                    locale={{ emptyText: "No Comments" }}
                    dataSource={photo.comments}
                    renderItem={(comment) => <List.Item>{comment.content}</List.Item>}
                  />
                </div>
              </div>
              <div className="mt-5">
                <Form onFinish={(values) => handleSubmitComment(photo.id, values.comment)}>
                  <Form.Item style={{ marginBottom: "5px" }} name="comment">
                    <Input placeholder="Add a comment" allowClear />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Add Comment
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
