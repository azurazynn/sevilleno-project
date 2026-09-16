import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Mail,
    MapPin,
    Pencil,
    Phone,
    Trash2,
    User,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { Student } from '@/types';

type ShowProps = {
    student: Student;
};

export default function ShowStudent({ student }: ShowProps) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fullName =
        student.full_name ||
        [student.first_name, student.middle_name, student.last_name]
            .filter(Boolean)
            .join(' ');

    const formatDate = (dateString?: string) => {
        if (!dateString) {
            return '—';
        }

        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateString?: string) => {
        if (!dateString) {
            return '—';
        }

        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(`/students/${student.id}`, {
            onFinish: () => {
                setIsDeleting(false);
                setConfirmDelete(false);
            },
        });
    };

    return (
        <>
            <Head title={`Student Details - ${fullName}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header with Navigation & Action Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="size-9"
                        >
                            <Link href="/students">
                                <ArrowLeft className="size-5" />
                            </Link>
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight">
                                    {fullName}
                                </h1>
                                <Badge
                                    variant={
                                        student.status === 'Active'
                                            ? 'default'
                                            : 'secondary'
                                    }
                                    className={
                                        student.status === 'Active'
                                            ? 'bg-emerald-600 text-white dark:bg-emerald-700'
                                            : ''
                                    }
                                >
                                    {student.status}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <span className="font-mono">
                                    {student.student_number}
                                </span>{' '}
                                •{' '}
                                <span className="font-medium text-foreground">
                                    {student.course}
                                </span>{' '}
                                ({student.year_level})
                            </p>
                        </div>
                    </div>

                    {/* Action buttons: Edit, Delete, Back */}
                    <div className="flex items-center gap-2">
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                        >
                            <Link href="/students">
                                <ArrowLeft className="size-4" />
                                Back to Students
                            </Link>
                        </Button>
                        <Button asChild size="sm" className="gap-1.5">
                            <Link href={`/students/${student.id}/edit`}>
                                <Pencil className="size-4" />
                                Edit Student
                            </Link>
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="gap-1.5"
                            onClick={() => setConfirmDelete(true)}
                        >
                            <Trash2 className="size-4" />
                            Delete Student
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* STUDENT INFORMATION */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center gap-2 pb-3">
                            <User className="size-5 text-primary" />
                            <CardTitle className="text-base font-semibold">
                                Student & Academic Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 divide-y divide-sidebar-border/50 text-sm">
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Student Number:
                                </span>
                                <span className="font-mono font-medium">
                                    {student.student_number}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Course / Program:
                                </span>
                                <span className="font-medium text-foreground">
                                    {student.course}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Year Level:
                                </span>
                                <span className="font-medium text-foreground">
                                    {student.year_level}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    First Name:
                                </span>
                                <span className="font-medium">
                                    {student.first_name}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Middle Name:
                                </span>
                                <span className="font-medium">
                                    {student.middle_name || '—'}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Last Name:
                                </span>
                                <span className="font-medium">
                                    {student.last_name}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Gender:
                                </span>
                                <span className="font-medium">
                                    {student.gender}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Birth Date:
                                </span>
                                <span className="font-medium">
                                    {formatDate(student.birth_date)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CONTACT INFORMATION */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center gap-2 pb-3">
                            <Phone className="size-5 text-primary" />
                            <CardTitle className="text-base font-semibold">
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 divide-y divide-sidebar-border/50 text-sm">
                            <div className="flex justify-between py-2">
                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                    <MapPin className="size-4" /> Address:
                                </span>
                                <span className="max-w-[260px] text-right font-medium">
                                    {student.address || '—'}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                    <Phone className="size-4" /> Phone:
                                </span>
                                <span className="font-mono font-medium">
                                    {student.phone || '—'}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                    <Mail className="size-4" /> Email:
                                </span>
                                <span className="font-medium">
                                    {student.email ? (
                                        <a
                                            href={`mailto:${student.email}`}
                                            className="text-primary hover:underline"
                                        >
                                            {student.email}
                                        </a>
                                    ) : (
                                        '—'
                                    )}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* GUARDIAN INFORMATION */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center gap-2 pb-3">
                            <Users className="size-5 text-primary" />
                            <CardTitle className="text-base font-semibold">
                                Guardian Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 divide-y divide-sidebar-border/50 text-sm">
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Guardian Name:
                                </span>
                                <span className="font-medium">
                                    {student.guardian_name}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Guardian Phone:
                                </span>
                                <span className="font-mono font-medium">
                                    {student.guardian_phone}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* STATUS & TIMESTAMPS */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center gap-2 pb-3">
                            <Calendar className="size-5 text-primary" />
                            <CardTitle className="text-base font-semibold">
                                Status & System Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 divide-y divide-sidebar-border/50 text-sm">
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Status:
                                </span>
                                <div>
                                    <Badge
                                        variant={
                                            student.status === 'Active'
                                                ? 'default'
                                                : 'secondary'
                                        }
                                        className={
                                            student.status === 'Active'
                                                ? 'bg-emerald-600 text-white dark:bg-emerald-700'
                                                : ''
                                        }
                                    >
                                        {student.status}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Created:
                                </span>
                                <span className="font-medium">
                                    {formatDateTime(student.created_at)}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">
                                    Last Updated:
                                </span>
                                <span className="font-medium">
                                    {formatDateTime(student.updated_at)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure you want to delete this student?
                        </DialogTitle>
                        <DialogDescription>
                            This will permanently delete{' '}
                            <strong>
                                {student.student_number} - {fullName}
                            </strong>{' '}
                            from the database. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:justify-end">
                        <DialogClose asChild>
                            <Button variant="outline" disabled={isDeleting}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

ShowStudent.layout = {
    breadcrumbs: [
        {
            title: 'Students',
            href: '/students',
        },
        {
            title: 'Student Details',
            href: '/students',
        },
    ],
};
