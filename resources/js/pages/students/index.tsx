import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    GraduationCap,
    Pencil,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { PaginatedData, Student } from '@/types';

type PageProps = {
    students: PaginatedData<Student>;
    filters: {
        search?: string;
    };
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

export default function StudentsIndex({ students, filters }: PageProps) {
    const { flash } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(
        null,
    );
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/students',
            { search: searchTerm },
            { preserveState: true, replace: true },
        );
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        router.get('/students', {}, { preserveState: true, replace: true });
    };

    const handleDeleteConfirm = () => {
        if (!studentToDelete) {
            return;
        }

        setIsDeleting(true);
        router.delete(`/students/${studentToDelete.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setStudentToDelete(null);
            },
        });
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) {
            return '—';
        }

        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <>
            <Head title="Students" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header & Action Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Students
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage student enrollments, personal records, and
                            guardian contact details.
                        </p>
                    </div>
                    <div>
                        <Button asChild className="gap-2 shadow-xs">
                            <Link href="/students/create">
                                <Plus className="size-4" />
                                Add Student
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Search and Table Card */}
                <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                    <CardHeader className="pb-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle className="text-base font-semibold">
                                    Student Directory
                                </CardTitle>
                                <CardDescription>
                                    Total {students.total} students registered
                                </CardDescription>
                            </div>

                            {/* Search bar */}
                            <form
                                onSubmit={handleSearchSubmit}
                                className="relative flex w-full max-w-sm items-center"
                            >
                                <Search className="absolute left-3 size-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search students..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pr-8 pl-9"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="absolute right-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="size-4" />
                                    </button>
                                )}
                            </form>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        {students.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-y border-sidebar-border/70 bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                                            <th className="py-3.5 pr-4 pl-6">
                                                Student Number
                                            </th>
                                            <th className="px-4 py-3.5">
                                                Full Name
                                            </th>
                                            <th className="px-4 py-3.5">
                                                Course & Year
                                            </th>
                                            <th className="px-4 py-3.5">
                                                Gender
                                            </th>
                                            <th className="px-4 py-3.5">
                                                Birth Date
                                            </th>
                                            <th className="px-4 py-3.5">
                                                Contact
                                            </th>
                                            <th className="px-4 py-3.5">
                                                Guardian
                                            </th>
                                            <th className="px-4 py-3.5">
                                                Status
                                            </th>
                                            <th className="py-3.5 pr-6 pl-4 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-sidebar-border/60">
                                        {students.data.map((student) => {
                                            const fullName =
                                                student.full_name ||
                                                [
                                                    student.first_name,
                                                    student.middle_name,
                                                    student.last_name,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' ');

                                            return (
                                                <tr
                                                    key={student.id}
                                                    className="transition-colors hover:bg-muted/40"
                                                >
                                                    <td className="py-3 pr-4 pl-6 font-mono font-medium text-foreground">
                                                        <Link
                                                            href={`/students/${student.id}`}
                                                            className="hover:underline"
                                                        >
                                                            {
                                                                student.student_number
                                                            }
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-foreground">
                                                        {fullName}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="text-xs font-medium text-foreground">
                                                            {student.course}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {student.year_level}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-muted-foreground">
                                                        {student.gender}
                                                    </td>
                                                    <td className="px-4 py-3 text-muted-foreground">
                                                        {formatDate(
                                                            student.birth_date,
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="font-mono text-xs">
                                                            {student.phone ||
                                                                '—'}
                                                        </div>
                                                        {student.email && (
                                                            <div className="max-w-[160px] truncate text-xs text-muted-foreground">
                                                                {student.email}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="text-xs font-medium">
                                                            {
                                                                student.guardian_name
                                                            }
                                                        </div>
                                                        <div className="font-mono text-xs text-muted-foreground">
                                                            {
                                                                student.guardian_phone
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge
                                                            variant={
                                                                student.status ===
                                                                'Active'
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                            className={
                                                                student.status ===
                                                                'Active'
                                                                    ? 'bg-emerald-600 text-white dark:bg-emerald-700'
                                                                    : ''
                                                            }
                                                        >
                                                            {student.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-3 pr-6 pl-4 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Button
                                                                asChild
                                                                variant="ghost"
                                                                size="icon"
                                                                className="size-8"
                                                                title="View Details"
                                                            >
                                                                <Link
                                                                    href={`/students/${student.id}`}
                                                                >
                                                                    <Eye className="size-4" />
                                                                    <span className="sr-only">
                                                                        View
                                                                    </span>
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                asChild
                                                                variant="ghost"
                                                                size="icon"
                                                                className="size-8"
                                                                title="Edit Student"
                                                            >
                                                                <Link
                                                                    href={`/students/${student.id}/edit`}
                                                                >
                                                                    <Pencil className="size-4" />
                                                                    <span className="sr-only">
                                                                        Edit
                                                                    </span>
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="size-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                                title="Delete Student"
                                                                onClick={() =>
                                                                    setStudentToDelete(
                                                                        student,
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="size-4" />
                                                                <span className="sr-only">
                                                                    Delete
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <GraduationCap className="mb-3 size-12 text-muted-foreground/40" />
                                <h3 className="text-base font-semibold">
                                    No students found
                                </h3>
                                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                    {filters.search
                                        ? `No results match your search "${filters.search}". Try different keywords.`
                                        : 'There are currently no students in the database.'}
                                </p>
                                {filters.search ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleClearSearch}
                                        className="mt-4"
                                    >
                                        Clear Search
                                    </Button>
                                ) : (
                                    <Button asChild size="sm" className="mt-4">
                                        <Link href="/students/create">
                                            <Plus className="mr-1.5 size-4" />
                                            Add First Student
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Pagination Footer */}
                        {students.total > 0 && (
                            <div className="flex flex-col items-center justify-between gap-4 border-t border-sidebar-border/70 px-6 py-4 sm:flex-row">
                                <p className="text-xs text-muted-foreground">
                                    Showing{' '}
                                    <span className="font-medium text-foreground">
                                        {students.from || 0}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium text-foreground">
                                        {students.to || 0}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium text-foreground">
                                        {students.total}
                                    </span>{' '}
                                    students
                                </p>

                                <div className="flex items-center gap-1">
                                    {students.links.map((link, i) => {
                                        const isPrev =
                                            link.label.includes('Previous');
                                        const isNext =
                                            link.label.includes('Next');

                                        return (
                                            <Button
                                                key={i}
                                                asChild={Boolean(link.url)}
                                                variant={
                                                    link.active
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                size="sm"
                                                disabled={!link.url}
                                                className={`h-8 min-w-8 px-2 text-xs ${
                                                    !link.url
                                                        ? 'pointer-events-none opacity-40'
                                                        : ''
                                                }`}
                                            >
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        preserveState
                                                        preserveScroll
                                                    >
                                                        {isPrev ? (
                                                            <ChevronLeft className="size-4" />
                                                        ) : isNext ? (
                                                            <ChevronRight className="size-4" />
                                                        ) : (
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: link.label,
                                                                }}
                                                            />
                                                        )}
                                                    </Link>
                                                ) : isPrev ? (
                                                    <ChevronLeft className="size-4" />
                                                ) : isNext ? (
                                                    <ChevronRight className="size-4" />
                                                ) : (
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                )}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={Boolean(studentToDelete)}
                onOpenChange={(open) => {
                    if (!open) {
                        setStudentToDelete(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure you want to delete this student?
                        </DialogTitle>
                        <DialogDescription>
                            This will permanently remove{' '}
                            <strong>
                                {studentToDelete?.student_number} -{' '}
                                {studentToDelete?.full_name ||
                                    `${studentToDelete?.first_name} ${studentToDelete?.last_name}`}
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
                            onClick={handleDeleteConfirm}
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

StudentsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Students',
            href: '/students',
        },
    ],
};
