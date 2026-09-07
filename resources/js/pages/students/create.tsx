import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function CreateStudent() {
    const { data, setData, post, processing, errors } = useForm({
        student_number: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        gender: 'Male',
        birth_date: '',
        address: '',
        phone: '',
        email: '',
        guardian_name: '',
        guardian_phone: '',
        status: 'Active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/students');
    };

    return (
        <>
            <Head title="Add Student" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Button asChild variant="ghost" size="icon" className="size-8">
                                <Link href="/students">
                                    <ArrowLeft className="size-4" />
                                </Link>
                            </Button>
                            <h1 className="text-2xl font-bold tracking-tight">Add New Student</h1>
                        </div>
                        <p className="text-sm text-muted-foreground ml-10">
                            Fill out the required information to register a new student record.
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
                                Basic identifying details of the student.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                                <Label htmlFor="student_number">
                                    Student Number <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="student_number"
                                    name="student_number"
                                    placeholder="e.g. 2026-0001"
                                    value={data.student_number}
                                    onChange={(e) => setData('student_number', e.target.value)}
                                    aria-invalid={Boolean(errors.student_number)}
                                />
                                <InputError message={errors.student_number} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="first_name">
                                    First Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    placeholder="First name"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    aria-invalid={Boolean(errors.first_name)}
                                />
                                <InputError message={errors.first_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="middle_name">
                                    Middle Name <span className="text-xs text-muted-foreground">(Optional)</span>
                                </Label>
                                <Input
                                    id="middle_name"
                                    name="middle_name"
                                    placeholder="Middle name"
                                    value={data.middle_name}
                                    onChange={(e) => setData('middle_name', e.target.value)}
                                    aria-invalid={Boolean(errors.middle_name)}
                                />
                                <InputError message={errors.middle_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="last_name">
                                    Last Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Last name"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    aria-invalid={Boolean(errors.last_name)}
                                />
                                <InputError message={errors.last_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">
                                    Gender <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={data.gender}
                                    onValueChange={(val) =>
                                        setData('gender', val as 'Male' | 'Female' | 'Other')
                                    }
                                >
                                    <SelectTrigger id="gender" className="w-full">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.gender} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birth_date">
                                    Birth Date <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="birth_date"
                                    name="birth_date"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                    aria-invalid={Boolean(errors.birth_date)}
                                />
                                <InputError message={errors.birth_date} />
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
                                Address, phone number, and email communication channels.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="address">
                                    Address <span className="text-xs text-muted-foreground">(Optional)</span>
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="House/Unit, Street, Barangay, City"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    aria-invalid={Boolean(errors.address)}
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">
                                    Phone Number <span className="text-xs text-muted-foreground">(Optional)</span>
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="09123456789"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    aria-invalid={Boolean(errors.phone)}
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email Address <span className="text-xs text-muted-foreground">(Optional)</span>
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="student@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
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
                                Primary parent or emergency guardian contact.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="guardian_name">
                                    Guardian Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="guardian_name"
                                    name="guardian_name"
                                    placeholder="Full name of guardian"
                                    value={data.guardian_name}
                                    onChange={(e) => setData('guardian_name', e.target.value)}
                                    aria-invalid={Boolean(errors.guardian_name)}
                                />
                                <InputError message={errors.guardian_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="guardian_phone">
                                    Guardian Phone <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="guardian_phone"
                                    name="guardian_phone"
                                    type="tel"
                                    placeholder="09123456789"
                                    value={data.guardian_phone}
                                    onChange={(e) => setData('guardian_phone', e.target.value)}
                                    aria-invalid={Boolean(errors.guardian_phone)}
                                />
                                <InputError message={errors.guardian_phone} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* STATUS */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Status</CardTitle>
                            <CardDescription>
                                Set the enrollment status of the student.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="max-w-xs space-y-2">
                                <Label htmlFor="status">
                                    Enrollment Status <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(val) =>
                                        setData('status', val as 'Active' | 'Inactive')
                                    }
                                >
                                    <SelectTrigger id="status" className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button asChild variant="outline" type="button" disabled={processing}>
                            <Link href="/students">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="gap-2">
                            <Save className="size-4" />
                            {processing ? 'Saving...' : 'Save Student'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

CreateStudent.layout = {
    breadcrumbs: [
        {
            title: 'Students',
            href: '/students',
        },
        {
            title: 'Add Student',
            href: '/students/create',
        },
    ],
};
