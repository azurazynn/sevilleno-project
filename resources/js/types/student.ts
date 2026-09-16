export interface Student {
    id: number;
    student_number: string;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    full_name?: string;
    gender: 'Male' | 'Female' | 'Other';
    birth_date: string;
    course: string;
    year_level: string;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    guardian_name: string;
    guardian_phone: string;
    status: 'Active' | 'Inactive';
    created_at: string;
    updated_at: string;
}

export interface CourseCount {
    course: string;
    count: number;
}

export interface YearLevelCount {
    year_level: string;
    count: number;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
