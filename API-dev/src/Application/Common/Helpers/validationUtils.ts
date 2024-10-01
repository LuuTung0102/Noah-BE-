export class validationUtils {
    static validateName(name: string): string | null {
        const trimmedName = name.trim();
        const regex = /^[a-zA-Z0-9 ]+$/;
        if (!regex.test(trimmedName)) {
            return 'Fullname cannot contain special characters';
        }
        return null;
    }

    static validateEmail(email: string): string | null {
        // Biểu thức chính quy kiểm tra định dạng email
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return 'Invalid email format';
        }
        return null;
    }

    static validatePhoneNumber(phoneNumber: string): string | null {
        // Biểu thức chính quy kiểm tra chuỗi chỉ chứa các số
        const regex = /^[0-9]+$/;
        if (!regex.test(phoneNumber)) {
            return 'Phone number can only contain digits';
        }
        return null;
    }

    static validatePassword(password: string): string | null {
        const regex = /^(?=.*[!@#$%^&*()])(?=.*[A-Z])(?!.*\s).*$/;
        if (!regex.test(password)) {
            return 'Password must contain at least one special character, one uppercase letter, and no whitespace';
        }
        return null;
    }

    static validateUsername(name: string): string | null {
        const trimmedName = name.trim();
        const regex = /^[a-zA-Z0-9 ]+$/;
        if (!regex.test(trimmedName)) {
            return 'Username cannot contain special characters';
        }
        return null;
    }
}