import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Student } from '@/types';

type EditProps = {
    student: Student;
};

export default function EditStudent({ student }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        student_number: student.student_number || '',
        first_name: student.first_name || '',
        middle_name: student.middle_name || '',
        last_name: student.last_name || '',
        gender: student.gender || 'Male',
        birth_date: student.birth_date
            ? student.birth_date.substring(0, 10)
            : '',
        course: student.course || 'BS Information Technology',
        year_level: student.year_level || '1st Year',
        address: student.address || '',
        phone: student.phone || '',
        email: student.email || '',
        guardian_name: student.guardian_name || '',
        guardian_phone: student.guardian_phone || '',
        status: student.status || 'Active',
    });

    const fullName =
        student.full_name ||
        [student.first_name, student.middle_name, student.last_name]
            .filter(Boolean)
            .join(' ');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/students/${student.id}`);
    };

    return (
        <>
            <Head title={`Edit Student - ${fullName}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Button
                                asChild
                                variant="ghost"
                                size="icon"
                                className="size-8"
                            >
                                <Link href={`/students/${student.id}`}>
                                    <ArrowLeft className="size-4" />
                                </Link>
                            </Button>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Edit Student
                            </h1>
                        </div>
                        <p className="ml-10 text-sm text-muted-foreground">
                            Updating details for{' '}
                            <span className="font-semibold text-foreground">
                                {fullName}
                            </span>{' '}
                            (
                            <span className="font-mono">
                                {student.student_number}
                            </span>
                            )
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* PERSONAL INFORMATION */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">
                                Personal Information
                            </CardTitle>
                            <CardDescription>
                                Update identifying details of the student.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                                <Label htmlFor="student_number">
                                    Student Number{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="student_number"
                                    name="student_number"
                                    placeholder="e.g. 2026-0001"
                                    value={data.student_number}
                                    onChange={(e) =>
                                        setData(
                                            'student_number',
                                            e.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(
                                        errors.student_number,
                                    )}
                                />
                                <InputError message={errors.student_number} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="first_name">
                                    First Name{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    placeholder="First name"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData('first_name', e.target.value)
                                    }
                                    aria-invalid={Boolean(errors.first_name)}
                                />
                                <InputError message={errors.first_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="middle_name">
                                    Middle Name{' '}
                                    <span className="text-xs text-muted-foreground">
                                        (Optional)
                                    </span>
                                </Label>
                                <Input
                                    id="middle_name"
                                    name="middle_name"
                                    placeholder="Middle name"
                                    value={data.middle_name}
                                    onChange={(e) =>
                                        setData('middle_name', e.target.value)
                                    }
                                    aria-invalid={Boolean(errors.middle_name)}
                                />
                                <InputError message={errors.middle_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="last_name">
                                    Last Name{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Last name"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData('last_name', e.target.value)
                                    }
                                    aria-invalid={Boolean(errors.last_name)}
                                />
                                <InputError message={errors.last_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">
                                    Gender{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={data.gender}
                                    onValueChange={(val) =>
                                        setData(
                                            'gender',
                                            val as 'Male' | 'Female' | 'Other',
                                        )
                                    }
                                >
                                    <SelectTrigger
                                        id="gender"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="Female">
                                            Female
                                        </SelectItem>
                                        <SelectItem value="Other">
                                            Other
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.gender} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birth_date">
                                    Birth Date{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="birth_date"
                                    name="birth_date"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(e) =>
                                        setData('birth_date', e.target.value)
                                    }
                                    aria-invalid={Boolean(errors.birth_date)}
                                />
                                <InputError message={errors.birth_date} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* ACADEMIC INFORMATION */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">
                                Academic Information
                            </CardTitle>
                            <CardDescription>
                                Degree program and year level of enrollment.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="course">
                                    Course / Program{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={data.course}
                                    onValueChange={(val) =>
                                        setData('course', val)
                                    }
                                >
                                    <SelectTrigger
                                        id="course"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BS Information Technology">
                                            BS Information Technology (BSIT)
                                        </SelectItem>
                                        <SelectItem value="BS Computer Science">
                                            BS Computer Science (BSCS)
                                        </SelectItem>
                                        <SelectItem value="BS Information Systems">
                                            BS Information Systems (BSIS)
                                        </SelectItem>
                                        <SelectItem value="BS Business Administration">
                                            BS Business Administration (BSBA)
                                        </SelectItem>
                                        <SelectItem value="BS Hospitality Management">
                                            BS Hospitality Management (BSHM)
                                        </SelectItem>
                                        <SelectItem value="BS Accountancy">
                                            BS Accountancy (BSA)
                                        </SelectItem>
                                        <SelectItem value="BS Nursing">
                                            BS Nursing (BSN)
                                        </SelectItem>
                                        <SelectItem value="BS Civil Engineering">
                                            BS Civil Engineering (BSCE)
                                        </SelectItem>
                                        <SelectItem value="BS Education">
                                            BS Education (BSED)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.course} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="year_level">
                                    Year Level{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={data.year_level}
                                    onValueChange={(val) =>
                                        setData('year_level', val)
                                    }
                                >
                                    <SelectTrigger
                                        id="year_level"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select year level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st Year">
                                            1st Year
                                        </SelectItem>
                                        <SelectItem value="2nd Year">
                                            2nd Year
                                        </SelectItem>
                                        <SelectItem value="3rd Year">
                                            3rd Year
                                        </SelectItem>
                                        <SelectItem value="4th Year">
                                            4th Year
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.year_level} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* CONTACT INFORMATION */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">
                                Contact Information
                            </CardTitle>
                            <CardDescription>
                                Address, telephone, and email communication
                                channels.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="address">
                                    Address{' '}
                                    <span className="text-xs text-muted-foreground">
                                        (Optional)
                                    </span>
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="House/Unit, Street, Barangay, City"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData('address', e.target.value)
                                    }
                                    aria-invalid={Boolean(errors.address)}
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">
                                    Phone Number{' '}
                                    <span className="text-xs text-muted-foreground">
                                        (Optional)
                                    </span>
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="09123456789"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    aria-invalid={Boolean(errors.phone)}
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email Address{' '}
                                    <span className="text-xs text-muted-foreground">
                                        (Optional)
                                    </span>
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="student@example.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    aria-invalid={Boolean(errors.email)}
                                />
                                <InputError message={errors.email} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* GUARDIAN INFORMATION */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">
                                Guardian Information
                            </CardTitle>
                            <CardDescription>
                                Parent or designated emergency guardian contact.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="guardian_name">
                                    Guardian Name{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="guardian_name"
                                    name="guardian_name"
                                    placeholder="Full name of guardian"
                                    value={data.guardian_name}
                                    onChange={(e) =>
                                        setData('guardian_name', e.target.value)
                                    }
                                    aria-invalid={Boolean(errors.guardian_name)}
                                />
                                <InputError message={errors.guardian_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="guardian_phone">
                                    Guardian Phone{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="guardian_phone"
                                    name="guardian_phone"
                                    type="tel"
                                    placeholder="09123456789"
                                    value={data.guardian_phone}
                                    onChange={(e) =>
                                        setData(
                                            'guardian_phone',
                                            e.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(
                                        errors.guardian_phone,
                                    )}
                                />
                                <InputError message={errors.guardian_phone} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* STATUS */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">
                                Status
                            </CardTitle>
                            <CardDescription>
                                Current enrollment status.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="max-w-xs space-y-2">
                                <Label htmlFor="status">
                                    Enrollment Status{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(val) =>
                                        setData(
                                            'status',
                                            val as 'Active' | 'Inactive',
                                        )
                                    }
                                >
                                    <SelectTrigger
                                        id="status"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="Inactive">
                                            Inactive
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            asChild
                            variant="outline"
                            type="button"
                            disabled={processing}
                        >
                            <Link href={`/students/${student.id}`}>Cancel</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="gap-2"
                        >
                            <Save className="size-4" />
                            {processing ? 'Saving Changes...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

EditStudent.layout = {
    breadcrumbs: [
        {
            title: 'Students',
            href: '/students',
        },
        {
            title: 'Edit Student',
            href: '/students',
        },
    ],
};
