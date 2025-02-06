"use client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../../components/Header';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useRouter, useParams } from 'next/navigation';
const { Dragger } = Upload;



const gold = () => {
    const { form } = useParams()
    const [isDownload, setIsDownload] = useState(false);
    const router = useRouter();
    const int_req_id = parseInt(form)
    const filepdf = async () => {
        try {
            // console.log("golden id form",int_req_id);
            const response = await axios.get(`/api/export/UHC_Reg?id=${int_req_id}`, { responseType: 'blob' });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilescitizen, setSelectedFilescitizen] = useState([]);
    const [selectedFilesstudent, setSelectedFilesstudent] = useState([]);
    const [selectedFileshouse, setSelectedFileshouse] = useState([]);



    const handleFileChange = (info) => {
        const { status } = info.file;
        if (status === 'done') {
            const fileList = info.fileList.map(file => file.originFileObj); // ดึงไฟล์ออกมาเป็น Array
            setSelectedFiles(fileList); // เก็บไฟล์ลง state
        } else if (status === 'error') {
            setSelectedFiles([]); // ล้าง state เมื่อเกิดข้อผิดพลาด
        }
    };
    const handleFilecitizen = (info) => {
        const { status } = info.file;
        if (status === 'done') {
            const fileList = info.fileList.map(file => file.originFileObj); // ดึงไฟล์ออกมาเป็น Array
            setSelectedFilescitizen(fileList); // เก็บไฟล์ลง state
        } else if (status === 'error') {
            setSelectedFiles([]); // ล้าง state เมื่อเกิดข้อผิดพลาด
        }
    };
    const handleFilehouse = (info) => {
        const { status } = info.file;
        if (status === 'done') {
            const fileList = info.fileList.map(file => file.originFileObj); // ดึงไฟล์ออกมาเป็น Array
            setSelectedFileshouse(fileList); // เก็บไฟล์ลง state
        } else if (status === 'error') {
            setSelectedFiles([]); // ล้าง state เมื่อเกิดข้อผิดพลาด
        }
    };
    const handleFilestudent = (info) => {
        const { status } = info.file;
        if (status === 'done') {
            const fileList = info.fileList.map(file => file.originFileObj); // ดึงไฟล์ออกมาเป็น Array
            setSelectedFilesstudent(fileList); // เก็บไฟล์ลง state
        } else if (status === 'error') {
            setSelectedFiles([]); // ล้าง state เมื่อเกิดข้อผิดพลาด
        }
    };


    const handleConfirm = async (event) => {
        event.preventDefault();
        if (!allChecked()) {
            notifyerror();
            return;
        }

        if (!selectedFiles || selectedFiles.length === 0) { // ตรวจสอบไฟล์
            toast.error("กรุณาเลือกไฟล์ก่อนทำการอัปโหลด");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append("file", file); // เพิ่มไฟล์ลงใน FormData
        });
        selectedFilescitizen.forEach(file => {
            formData.append("file_citizen", file)
        })
        selectedFileshouse.forEach(file => {
            formData.append("file_house", file)
        })
        selectedFilesstudent.forEach(file => {
            formData.append("file_student", file)
        })

        try {
            console.log(int_req_id)
            if (int_req_id !== 0) {
                const response = await axios.post(
                    `/api/POSTPDF/update?id=${int_req_id}`, // เรียก API endpoint
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            } else {
                const response = await axios.post(
                    `/api/POSTPDF/create`, // เรียก API endpoint
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }


            // console.log(response.data);
            window.location.href = "/home";
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("การอัปโหลดล้มเหลว");
        }
    };


    const props = {
        name: 'file',
        multiple: false, // อนุญาตให้อัปโหลดหลายไฟล์
        onChange(info) {
            handleFileChange(info); // ใช้ฟังก์ชันใหม่ที่แก้ไขแล้ว
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                console.log(info);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const citizen = {
        name: 'file',
        multiple: false, // อนุญาตให้อัปโหลดหลายไฟล์
        onChange(info) {
            handleFilecitizen(info); // ใช้ฟังก์ชันใหม่ที่แก้ไขแล้ว
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                console.log(info);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const house = {
        name: 'file',
        multiple: false, // อนุญาตให้อัปโหลดหลายไฟล์
        onChange(info) {
            handleFilehouse(info); // ใช้ฟังก์ชันใหม่ที่แก้ไขแล้ว
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                console.log(info);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const student = {
        name: 'file',
        multiple: false, // อนุญาตให้อัปโหลดหลายไฟล์
        onChange(info) {
            handleFilestudent(info); // ใช้ฟังก์ชันใหม่ที่แก้ไขแล้ว
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                console.log(info);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };




    const handleDownload = async () => {
        const pdfBlob = await filepdf();
        if (pdfBlob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
            link.download = 'file.pdf';
            document.body.appendChild(link);
            // console.log(link)
            link.click();
            document.body.removeChild(link);
            setIsDownload(true);

        }
    };



    const [checkboxes, setCheckboxes] = useState({
        Option1: false,
        Option2: false,
        Option3: false,
    });

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        setCheckboxes({
            ...checkboxes,
            [event.target.id]: event.target.checked,
        });
    };

    // Function to check if all checkboxes are checked
    const allChecked = () => {
        return Object.values(checkboxes).every((isChecked) => isChecked);
    };
    const notifyerror = () => {
        toast.error('👆🏻 ติ๊กให้ครบทุกช่อง', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // transition: Bounce,
        });
    }
    // Function to handle navigation attempt
    const handleNavigation = (event, targetUrl) => {
        if (!allChecked()) {
            event.preventDefault();
            notifyerror()
        } else {
            window.location.href = targetUrl;
        }
    };
    const handleAllCheck = () => {
        const newState = Object.values(checkboxes).some(value => !value);
        setCheckboxes(Object.keys(checkboxes).reduce((acc, key) => {
            acc[key] = newState;
            return acc;
        }, {}));
    };
    const handleback = () => {
        router.push(`/golden_card/${int_req_id}`)
    }


    return (
        <div>
            <Header req1="แบบคำขอรับรองคุณสมบัติในการเข้าร่วมโครงการประกันสุขภาพถ้วนหน้า (กรุงเทพมหานคร) สำหรับนิสิตจุฬาลงกรณ์มหาวิทยาลัย และ หนังสือข้อตกลงขอขึ้นทะเบียนบัตรประกันสุขภาพถ้วนหน้า โรงพยาบาลจุฬาลงกรณ์ สภากาชาดไทย" req2="" />
            <div className="min-h-screen bg-white">
                <main className="flex justify-center items-center">
                    <div className="bg-white p-8 w-full max-w-4xl">

                        <h1 className="text-lg font-bold text-center mb-4 text-gray-800" >
                            Download เอกสารสำหรับเซ็นรับรอง
                        </h1>
                        <button
                            onClick={handleDownload}
                            className="px-6 py-3 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition duration-300 w-full h-16">
                            Download
                        </button>


                        <h2 className="pt-5 text-lg font-bold text-center mb-4 text-gray-800">
                            อัปโหลดเอกสารต่อไปนี้ (Upload the followering)
                        </h2>
                        <section>

                            <div className="grid grid-cols-1 gap-6">
                                <fieldset>
                                    <h1 className=" text-red-500">* แต่ละไฟล์ไม่เกิน 5 MB *</h1>
                                    <div >
                                        <div className=" py-4">
                                            <Dragger {...props}>
                                                {/* <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p> */}
                                                <p className="ant-upload-text">เอกสารที่เซ็นรับรอง</p>
                                            </Dragger>
                                        </div>
                                        <div className=" py-4" >
                                            <Dragger {...citizen}>
                                                {/* <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p> */}
                                                <p className="ant-upload-text">สำเนาบัตรประชาชนที่เซ็นรับรองสำเนา</p>
                                            </Dragger>
                                        </div>
                                        <div className=" py-4">
                                            <Dragger {...house}>
                                                {/* <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p> */}
                                                <p className="ant-upload-text">สำเนาทะเบียนบ้านที่ผู้ขอมีชื่ออยู่</p>
                                            </Dragger>
                                        </div>
                                        <div className=" py-4">
                                            <Dragger {...student}>
                                                {/* <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p> */}
                                                <p className="ant-upload-text">สำเนาบัตรประจำตัวนิสิต</p>
                                            </Dragger>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="flex space-x-4">
                                    <label
                                        htmlFor="Option9"
                                        className="-mx-4 flex cursor-pointer items-start gap-4 p-4 has-[:checked]:bg-blue-50"
                                    >
                                        <div className="flex items-center">
                                            &#8203;
                                            <input
                                                type="checkbox"
                                                className="size-4 rounded border-gray-300"
                                                id="Option9"
                                                checked={checkboxes.Option9}
                                                onChange={handleCheckboxChange}
                                            />
                                        </div>

                                        <div>
                                            <strong className="font-medium text-gray-900">เซ็นเอกสารแล้ว</strong>
                                        </div>
                                    </label>


                                    <label

                                        className="-mx-4 flex cursor-pointer items-start gap-4 p-4 has-[:checked]:bg-blue-50"
                                    >
                                        <div className="flex items-center">
                                            &#8203;
                                            <input
                                                type="checkbox"
                                                className="size-4 rounded border-gray-300"
                                                id="allCheck"
                                                checked={allChecked()}
                                                onChange={handleAllCheck}
                                                disabled={!isDownload}
                                            />
                                        </div>

                                        <div>
                                            <strong className="font-medium text-gray-900">อัปโหลดไฟล์แล้ว</strong>
                                        </div>
                                    </label>
                                </div>
                            </div>


                        </section>
                        {Object.values(checkboxes).filter(Boolean).length >= 2 && (
                            <div className="flex justify-between mt-8">
                                <button
                                    onClick={handleback}
                                    className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 transition duration-300">
                                    Back
                                </button>
                                <a
                                    href="/home"
                                    onClick={handleConfirm}>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-pink-400 text-white font-semibold rounded-lg shadow-md hover:bg-pink-500 transition duration-300"
                                    >
                                        Confirm
                                        <ToastContainer />
                                    </button>
                                </a>
                            </div>
                        )}
                    </div>
                </main>
            </div >
        </div >
    );
};

export default gold;