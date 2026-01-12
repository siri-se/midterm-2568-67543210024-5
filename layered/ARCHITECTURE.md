# ระบบจัดการห้องสมุด - สถาปัตยกรรม Layered

## C1. บริบท (Context)
โปรเจกต์นี้เป็น **ระบบจัดการห้องสมุด** โดยใช้ **สถาปัตยกรรมแบบ Layered (3-tier)**  
ผู้ใช้สามารถดู เพิ่ม แก้ไข ยืม คืน และลบหนังสือได้ ระบบแยกหน้าที่ออกเป็น 3 ชั้น:  
- **Presentation Layer**: จัดการ HTTP requests/responses และ UI  
- **Business Logic Layer**: ตรวจสอบกฎธุรกิจและข้อมูล  
- **Data Access Layer**: จัดการการเข้าถึงฐานข้อมูล SQLite  

## C2. แผนภาพ Container Diagram

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  ┌──────────────────────────────┐   │
│  │ Routes → Controllers         │   │
│  │ (HTTP Handling)              │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Business Logic Layer            │
│  ┌──────────────────────────────┐   │
│  │ Services → Validators        │   │
│  │ (Business Rules)             │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Data Access Layer               │
│  ┌──────────────────────────────┐   │
│  │ Repositories → Database      │   │
│  │ (SQL Queries)                │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
          ┌──────────┐
          │  SQLite  │
          └──────────┘
```

## หน้าที่ของแต่ละชั้น (Responsibilities)

### 1. Presentation Layer
- จัดการ HTTP requests (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)  
- เรียก **Controller** เพื่อประมวลผล request  
- ส่ง JSON response หรือ error กลับไปยัง client  
- จัดการ filtering, status update และการแสดงผล UI  

### 2. Business Logic Layer
- **Services** จัดการกฎธุรกิจ เช่น สร้าง/แก้ไขหนังสือ, ยืม/คืน, คำนวณสถิติ  
- **Validators** ตรวจสอบความถูกต้องของข้อมูล (ID, ISBN, fields ที่จำเป็น)  
- ส่ง error หาก validation หรือ business rules ไม่ผ่าน  

### 3. Data Access Layer
- **Repositories** จัดการ CRUD operations กับฐานข้อมูล  
- ติดต่อกับ SQLite โดยตรง และแปลง row เป็น JS object  
- รับผิดชอบการอ่าน/เขียนข้อมูล  

### 4. Database (SQLite)
- เก็บข้อมูลหนังสือ (`id`, `title`, `author`, `isbn`, `status`, `created_at`)  
- บังคับ unique constraint และค่า default  

---

## การไหลของข้อมูล (Data Flow: Request → Response)

1. **Client** ส่ง HTTP request (จาก UI หรือ API)  
2. **Routes** ใน Presentation Layer รับ request และส่งต่อไปยัง **Controller**  
3. **Controller** เรียก **Service** ใน Business Logic Layer  
4. **Service** ตรวจสอบข้อมูลผ่าน **Validators** และประยุกต์กฎธุรกิจ  
5. หากต้องการ **Service** จะเรียก **Repository** ใน Data Access Layer เพื่ออ่าน/เขียน SQLite  
6. **Repository** คืนผลลัพธ์กลับไปยัง **Service**  
7. **Controller** จัดรูปแบบ response และส่ง JSON กลับ **Client**  
8. **Client** แสดงผลบน UI  

---
### ตัวอย่าง: การยืมหนังสือ
```
Client (คลิก "ยืมหนังสือ")
↓
Route /api/books/:id/borrow
↓
BookController.borrowBook()
↓
BookService.borrowBook()
↓
BookRepository.updateStatus(id, 'borrowed')
↓
SQLite อัปเดตข้อมูล
↑
BookService คืนข้อมูลหนังสือที่อัปเดต
↑
BookController ส่ง JSON response
↑
Client UI แสดงสถานะใหม่
```
