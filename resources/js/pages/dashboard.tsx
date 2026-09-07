import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    GraduationCap,
    Plus,
    UserCheck,
    Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard } from '@/routes';
import type { Student } from '@/types';

type DashboardProps = {
    totalStudents: number;
    activeStudents: number;
    recentStudents: Student[];
};

export default function Dashboard({
    totalStudents = 0,
    activeStudents = 0,
    recentStudents = [],
}: DashboardProps) {
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

    const inactiveStudents = Math.max(0, totalStudents - activeStudents);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4 md:p-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                Total Students
                            </CardTitle>
                            <div className="rounded-md bg-primary/10 p-2 text-primary">
                                <GraduationCap className="size-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {totalStudents}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                All registered students in database
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                Active Students
                            </CardTitle>
                            <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                                <UserCheck className="size-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                {activeStudents}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {inactiveStudents} currently inactive
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                Quick Management
                            </CardTitle>
                            <div className="rounded-md bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                                <Users className="size-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2 pt-1">
                            <div className="flex items-center gap-2">
                                <Button asChild size="sm" className="w-full">
                                    <Link href="/students/create">
                                        <Plus className="mr-1.5 size-4" />
                                        Add Student
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                >
                                    <Link href="/students">
                                        View All
                                        <ArrowRight className="ml-1.5 size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Students Section */}
                <Card className="flex-1 border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                    <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-lg font-semibold">
                                Recent Students
                            </CardTitle>
                            <CardDescription>
                                Latest students enrolled or added to the system
                            </CardDescription>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/students">
                                View All Students
                                <ArrowRight className="ml-1.5 size-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {recentStudents.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-sidebar-border/70 text-xs font-semibold text-muted-foreground uppercase">
                                            <th className="py-3 pr-4">
                                                Student Number
                                            </th>
                                            <th className="px-4 py-3">
                                                Full Name
                                            </th>
                                            <th className="px-4 py-3">
                                                Gender
                                            </th>
                                            <th className="px-4 py-3">
                                                Status
                                            </th>
                                            <th className="py-3 pl-4 text-right">
                                                Date Added
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-sidebar-border/60">
                                        {recentStudents.map((student) => {
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
                                                    className="transition-colors hover:bg-muted/50"
                                                >
                                                    <td className="py-3 pr-4 font-mono font-medium text-foreground">
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
                                                    <td className="px-4 py-3 text-muted-foreground">
                                                        {student.gender}
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
                                                    <td className="py-3 pl-4 text-right text-muted-foreground">
                                                        {formatDate(
                                                            student.created_at,
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <GraduationCap className="mb-3 size-12 text-muted-foreground/40" />
                                <h3 className="text-base font-semibold">
                                    No students found
                                </h3>
                                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                    No students have been added to the database
                                    yet. Get started by adding your first
                                    student.
                                </p>
                                <Button asChild size="sm" className="mt-4">
                                    <Link href="/students/create">
                                        <Plus className="mr-1.5 size-4" />
                                        Add First Student
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
