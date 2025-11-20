# Noah Quiz - Backend API

## Giới thiệu

Noah Quiz là hệ thống backend API cho ứng dụng quiz/trắc nghiệm trực tuyến, được xây dựng với Node.js, Express, TypeScript và MongoDB. Hệ thống cung cấp các tính năng quản lý người dùng, câu hỏi, môn học, thanh toán và subscription.

## Kiến trúc

Dự án được xây dựng theo kiến trúc Clean Architecture với các layer:

```
src/
├── Api/                    # API Layer - Controllers, Routes, Middlewares
│   ├── Controllers/        # Xử lý HTTP requests/responses
│   ├── Routes/            # Định nghĩa API endpoints
│   └── Middlewares/       # Authentication, validation, file upload
├── Application/           # Application Layer - Business Logic
│   ├── Features/          # Use cases theo từng feature
│   ├── Common/            # Shared utilities, exceptions
│   ├── EventBus/          # Event handling
│   └── Persistences/      # Repository interfaces
├── Domain/                # Domain Layer - Business Entities
│   ├── Entities/          # Domain models
│   └── Enums/             # Enumerations
├── Infrastructure/        # Infrastructure Layer - External Services
│   ├── Persistences/      # Database implementations
│   ├── Services/          # External service integrations
│   ├── EventBus/          # Event bus implementation
│   └── Scheduler/         # Scheduled tasks
└── view/                  # Email templates
    └── emailTemplate/
```

## Công nghệ sử dụng

### Core Technologies
- **Node.js** - Runtime environment
- **TypeScript** - Programming language
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **speakeasy** - Two-factor authentication (2FA)
- **passport-google-oauth20** - Google OAuth integration

### File Handling
- **multer** - File upload middleware
- **qrcode** - QR code generation

### Email & Notifications
- **nodemailer** - Email sending
- **ejs** - Email template engine

### Scheduling & Background Jobs
- **node-cron** - Task scheduling
- **moment** / **moment-timezone** - Date/time handling

### API Documentation
- **swagger-autogen** - Auto-generate Swagger docs
- **swagger-ui-express** - Swagger UI interface
- **swagger-jsdoc** - JSDoc to Swagger conversion

### Development Tools
- **nodemon** - Auto-restart on file changes
- **ts-node** - TypeScript execution
- **dotenv** - Environment variable management

## Yêu cầu hệ thống

- Node.js >= 18.2.0
- MongoDB >= 6.5.0
- Yarn hoặc npm

## Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd noah-quiz
```

### 2. Cài đặt dependencies

```bash
yarn install
# hoặc
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env` trong thư mục root với các biến sau:

```env
# Server Configuration
PORT=3000

# Database
CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=NoahQuizDB

# JWT Configuration
REACT_APP_JWT_SECRET=your_jwt_secret_key
REACT_APP_EXPIRE_TOKEN=24h
REACT_APP_REFRESH_TOKEN_SECRET=your_refresh_token_secret
REACT_APP_EXPIRE_REFRESH_TOKEN=28h

# Email Configuration
REACT_APP_EMAIL=your_email@example.com
REACT_APP_PASSWORD=your_email_password

# Payment Configuration (PayOS)
PAYOS_CHECKSUM_KEY=your_payos_checksum_key
PAYMENT_CANCEL_URL=http://localhost:3000/payment/cancel
API_SAVE_ORDER_ENDPOINT=http://localhost:3000/api/orders
API_ENDPOINT_HOST=http://localhost:3000
```

### 4. Chạy ứng dụng

#### Development mode (với auto-reload)
```bash
yarn start
# hoặc
npm start
```

#### Production mode
```bash
yarn dev
# hoặc
npm run dev
```

Server sẽ chạy tại `http://localhost:3000`

## API Documentation

Sau khi khởi động server, truy cập Swagger UI tại:

```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication & User Management
- `POST /api/users/login` - Đăng nhập
- `POST /api/users/register` - Đăng ký tài khoản
- `POST /api/users/verify-email` - Xác thực email
- `POST /api/users/forgot-password` - Quên mật khẩu
- `POST /api/users/change-password` - Đổi mật khẩu
- `PUT /api/users/update-password` - Cập nhật mật khẩu
- `PUT /api/users/update-image` - Cập nhật ảnh đại diện
- `GET /api/users/profile` - Lấy thông tin profile

### Roles
- `GET /api/roles` - Lấy danh sách roles
- `POST /api/roles` - Tạo role mới
- `GET /api/roles/:id` - Lấy role theo ID
- `PUT /api/roles/:id` - Cập nhật role
- `DELETE /api/roles/:id` - Xóa role

### Schools
- `GET /api/schools` - Lấy danh sách trường
- `POST /api/schools` - Tạo trường mới
- `GET /api/schools/:id` - Lấy thông tin trường
- `PUT /api/schools/:id` - Cập nhật trường
- `DELETE /api/schools/:id` - Xóa trường

### Majors
- `GET /api/majors` - Lấy danh sách chuyên ngành
- `POST /api/majors` - Tạo chuyên ngành mới
- `GET /api/majors/:id` - Lấy thông tin chuyên ngành
- `PUT /api/majors/:id` - Cập nhật chuyên ngành
- `DELETE /api/majors/:id` - Xóa chuyên ngành

### Subjects
- `GET /api/subjects` - Lấy tất cả môn học
- `POST /api/subjects` - Tạo môn học mới (upload file)
- `GET /api/subjects/:subjectId` - Lấy thông tin môn học
- `PUT /api/subjects/:subjectId` - Cập nhật môn học
- `DELETE /api/subjects/:subjectId` - Xóa môn học
- `GET /api/subjects/:subjectId/download` - Tải xuống môn học

### Questions
- `POST /api/questions` - Tạo câu hỏi mới
- `GET /api/questions/:questionId` - Lấy câu hỏi theo ID
- `GET /api/questions/subject/:subjectId` - Lọc câu hỏi theo môn học
- `PUT /api/questions/:questionId` - Cập nhật câu hỏi
- `DELETE /api/questions/:questionId` - Xóa câu hỏi

### Answers
- `POST /api/answers` - Tạo câu trả lời
- `GET /api/answers/:answerId` - Lấy câu trả lời theo ID
- `PUT /api/answers/:answerId` - Cập nhật câu trả lời
- `DELETE /api/answers/:answerId` - Xóa câu trả lời

### Subscriptions
- `GET /api/subscriptions` - Lấy danh sách gói subscription
- `POST /api/subscriptions` - Tạo gói subscription
- `GET /api/subscriptions/:id` - Lấy thông tin gói
- `PUT /api/subscriptions/:id` - Cập nhật gói
- `DELETE /api/subscriptions/:id` - Xóa gói

### Orders & Payments
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders/:id` - Lấy thông tin đơn hàng
- `POST /api/payments` - Xử lý thanh toán
- `GET /api/payments/:id` - Lấy thông tin thanh toán

### File Management
- `POST /api/files/upload` - Upload file
- `GET /api/files/:filename` - Lấy file

## Tính năng chính

### 1. Quản lý người dùng
- Đăng ký/Đăng nhập với email
- Xác thực email
- Two-Factor Authentication (2FA)
- Quên mật khẩu và reset password
- Quản lý profile và avatar
- Phân quyền theo roles

### 2. Quản lý nội dung học tập
- Quản lý trường học (Schools)
- Quản lý chuyên ngành (Majors)
- Quản lý môn học (Subjects)
- Quản lý câu hỏi và câu trả lời
- Upload và download tài liệu môn học
- Hỗ trợ câu hỏi có hình ảnh

### 3. Hệ thống Subscription
- Các gói subscription khác nhau
- Quản lý thời hạn subscription
- Tự động gia hạn

### 4. Thanh toán
- Tích hợp PayOS
- Quản lý đơn hàng
- Theo dõi giao dịch

### 5. File Management
- Upload file (hình ảnh, tài liệu)
- Static file serving
- Tự động dọn dẹp file tạm

### 6. Scheduled Tasks
- Tự động dọn dẹp thư mục downloads
- Các task định kỳ khác

## Docker Support

### Build Docker image

```bash
docker build -t noah-quiz-backend .
```

### Run container

```bash
docker run -p 3000:3000 --env-file .env noah-quiz-backend
```

## Cấu trúc Database

### Collections chính

#### users
- Thông tin người dùng
- Authentication credentials
- 2FA settings
- Subscription info

#### roles
- Phân quyền hệ thống

#### schools
- Thông tin trường học

#### majors
- Chuyên ngành theo trường

#### subjects
- Môn học theo chuyên ngành
- Danh sách câu hỏi và câu trả lời

#### questions
- Câu hỏi trắc nghiệm
- Hỗ trợ text và hình ảnh

#### answers
- Câu trả lời cho mỗi câu hỏi
- Đánh dấu đáp án đúng

#### subscriptions
- Các gói dịch vụ

#### orders
- Đơn hàng

#### transactions
- Lịch sử giao dịch

#### sessions
- Quản lý phiên đăng nhập

#### logs
- Logging hoạt động hệ thống

## Security Features

### Authentication
- JWT-based authentication
- Refresh token mechanism
- Token expiration handling

### Password Security
- Bcrypt hashing
- Password strength validation
- Secure password reset flow

### Two-Factor Authentication
- TOTP-based 2FA
- QR code generation for authenticator apps

### API Security
- CORS configuration
- Request validation
- Authentication middleware
- Role-based access control

## File Upload

Hệ thống hỗ trợ upload file với các thư mục:

- `/uploads` - File người dùng upload (avatars, documents)
- `/downloads` - File tạm để download (tự động dọn dẹp)

## Email Templates

Email templates sử dụng EJS, được lưu tại `src/view/emailTemplate/`:
- Email xác thực tài khoản
- Email reset password
- Email thông báo

## Logging

Hệ thống ghi log các hoạt động:
- User actions
- Download activities
- Error tracking

## Error Handling

- Centralized error handling
- Custom exception classes
- Standardized error responses
- HTTP status code mapping

## Development

### Code Structure Guidelines

1. **Controllers**: Chỉ xử lý HTTP request/response
2. **Handlers**: Business logic implementation
3. **Repositories**: Database operations
4. **Entities**: Domain models
5. **Middlewares**: Cross-cutting concerns

### Adding New Features

1. Tạo Entity trong `Domain/Entities`
2. Tạo Repository trong `Infrastructure/Persistences`
3. Tạo Request/Response models trong `Application/Features`
4. Implement Handler trong `Application/Features`
5. Tạo Controller trong `Api/Controllers`
6. Định nghĩa Routes trong `Api/Routes`
7. Cập nhật Swagger documentation

## Testing

```bash
# Chạy tests (nếu có)
yarn test
```

## Troubleshooting

### Lỗi kết nối MongoDB
- Kiểm tra CONNECTION_STRING trong .env
- Đảm bảo MongoDB đang chạy
- Kiểm tra network access trong MongoDB Atlas

### Lỗi JWT
- Kiểm tra JWT_SECRET trong .env
- Đảm bảo token chưa hết hạn
- Kiểm tra format Authorization header: `Bearer <token>`

### Lỗi upload file
- Kiểm tra quyền ghi thư mục uploads/
- Kiểm tra dung lượng file
- Kiểm tra định dạng file được phép

## Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

MIT License

## Contact & Support

Để được hỗ trợ, vui lòng tạo issue trên GitHub repository.

---

**Noah Quiz Backend** - Hệ thống backend cho ứng dụng quiz trực tuyến
