# Library Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** นายสิริ รัตนรินทร์
- **Student ID:** 67543210024-5
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier)

## 📂 Project Structure
```
monolithic-library/
├── server.js          
├── package.json
├── library.db        
└── public/
    └── index.html
``` 
```
layered-library/
├── src/               
│   ├── presentation/
|   ├── routes/
│   │   │   └── bookRoutes.js     
│   │   ├── controllers/
│   │   │   └── bookController.js  
│   │   └── middlewares/
│   │       └── errorHandler.js
|   |    
│   ├── business/
│   │   ├── services/
│   │   │   └── bookService.js     
│   │   └── validators/
│   │       └── bookValidator.js  
|   |
│   └── data/
│       ├── repositories/
│       │   └── bookRepository.js 
│       └── database/
│           └── connection.js      
|
├── server.js
├── package.json
├── library.db
└── public/            
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── api.js
        └── app.js
```

## 🎯 Refactoring Summary

### ปัญหาของ Monolithic (เดิม):
- Code ทั้งหมดอยู่ในไฟล์เดียว ทำให้แก้ไขยากและสับสน  
- ไม่มีการแยก Business Logic กับ Presentation → ยากต่อการทดสอบ  
- การจัดการ Error และ Validation ซ้ำซ้อนหลายจุด  
- ขยายฟีเจอร์ใหม่ ๆ ทำได้ลำบาก  

### วิธีแก้ไขด้วย Layered Architecture:
- แยก Presentation (Controllers, Routes, Middlewares) จาก Business Logic และ Data Access  
- สร้าง Service layer สำหรับจัดการ Logic ของ Book และ Validator สำหรับตรวจสอบข้อมูล  
- Repository layer สำหรับ CRUD กับ SQLite ทำให้ Database abstraction ชัดเจน  
- Error Handling แยก Middleware ทำให้จัดการ Error ทุกจุดง่ายขึ้น  

### ประโยชน์ที่ได้รับ:
- Code อ่านง่าย แก้ไขและเพิ่มฟีเจอร์เร็วขึ้น  
- ทดสอบแต่ละชั้นได้ง่ายขึ้น (Unit Test & Integration Test)  
- ลดความซ้ำซ้อนของ Validation และ Error Handling  
- สามารถสลับ Database หรือ API ภายนอกได้ง่าย  
- รักษาความสอดคล้องของข้อมูลและโครงสร้างระบบ 

## 🚀 How to Run

```
# 1. Clone repository
git clone\https://github.com/siri-se/midterm-2568-67543210024-5.git

# 2. Install dependencies
npm install

# 3. Run server
npm start

# 4. Test API
Open browser: http://localhost:3000
```

## 📝 API Endpoints

| Method | Endpoint | Description|
| ------------- | ------------- | ------------- |
| GET | /api/books  | เรียกดูหนังสือทั้งหมด |
| GET  | /api/books/:id  | เรียกดูหนังสือจาก id |
| POST  | /api/books | สร้างหนังสือใหม่ |
| PUT  | /api/books/:id  | อัพเดตหนังสือจาก id |
| PATCH  | /api/books/:id/borrow | ยืมหนังสือ |
| PATCH  | /api/books/:id/return  | คืนหนังสือ |
| DELETE  | /api/books/:id  | ลบหนังสือจาก id |
