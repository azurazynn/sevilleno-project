import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpen,
    Calendar,
    GraduationCap,
    PieChart,
    Plus,
    UserCheck,
    Users,
} from 'lucide-react';
import { useState } from 'react';
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
import type { CourseCount, Student, YearLevelCount } from '@/types';

type DashboardProps = {
    totalStudents: number;
    activeStudents: number;
    recentStudents: Student[];
    courseDistribution?: CourseCount[];
    yearDistribution?: YearLevelCount[];
};

const CHART_COLORS = [
    '#3b82f6', // blue
    '#10b981', // emerald
    '#8b5cf6', // violet
    '#f59e0b', // amber
    '#f43f5e', // rose
    '#06b6d4', // cyan
    '#ec4899', // pink
];

export default function Dashboard({
    totalStudents = 0,
    activeStudents = 0,
    recentStudents = [],
    courseDistribution = [],
    yearDistribution = [],
}: DashboardProps) {
    const [hoveredCourseIndex, setHoveredCourseIndex] = useState<number | null>(
        null,
    );

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

    // Calculate SVG Donut parameters
    const totalCourseStudents =
        courseDistribution.reduce((acc, c) => acc + c.count, 0) ||
        totalStudents ||
        1;
    const radius = 68;
    const circumference = 2 * Math.PI * radius;

    const donutSlices = courseDistribution.map((course, index) => {
        const percentage = (course.count / totalCourseStudents) * 100;
        const previousPercentage = courseDistribution
            .slice(0, index)
            .reduce((acc, c) => acc + (c.count / totalCourseStudents) * 100, 0);
        const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
        const strokeDashoffset = -(previousPercentage / 100) * circumference;

        return {
            ...course,
            percentage: Math.round(percentage),
            color: CHART_COLORS[index % CHART_COLORS.length],
            strokeDasharray,
            strokeDashoffset,
        };
    });

    const activeCourseData =
        hoveredCourseIndex !== null && donutSlices[hoveredCourseIndex]
            ? donutSlices[hoveredCourseIndex]
            : null;

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
                                Quick Actions
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

                {/* Interactive Visual Charts Section */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Course Distribution Donut/Pie Chart */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                    <PieChart className="size-4 text-primary" />
                                    Course Distribution
                                </CardTitle>
                                <CardDescription>
                                    Student distribution by degree program
                                </CardDescription>
                            </div>
                            <Badge variant="outline" className="text-xs">
                                {courseDistribution.length} Courses
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            {courseDistribution.length > 0 ? (
                                <div className="flex flex-col items-center gap-6 pt-2 sm:flex-row sm:justify-around">
                                    {/* SVG Donut Chart */}
                                    <div className="relative size-48 shrink-0">
                                        <svg
                                            className="size-full -rotate-90"
                                            viewBox="0 0 160 160"
                                        >
                                            <circle
                                                cx="80"
                                                cy="80"
                                                r={radius}
                                                fill="transparent"
                                                stroke="currentColor"
                                                strokeWidth="18"
                                                className="text-muted/25"
                                            />
                                            {donutSlices.map((slice, index) => (
                                                <circle
                                                    key={slice.course}
                                                    cx="80"
                                                    cy="80"
                                                    r={radius}
                                                    fill="transparent"
                                                    stroke={slice.color}
                                                    strokeWidth={
                                                        hoveredCourseIndex ===
                                                        index
                                                            ? '22'
                                                            : '18'
                                                    }
                                                    strokeDasharray={
                                                        slice.strokeDasharray
                                                    }
                                                    strokeDashoffset={
                                                        slice.strokeDashoffset
                                                    }
                                                    className="cursor-pointer transition-all duration-300"
                                                    onMouseEnter={() =>
                                                        setHoveredCourseIndex(
                                                            index,
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredCourseIndex(
                                                            null,
                                                        )
                                                    }
                                                />
                                            ))}
                                        </svg>
                                        {/* Center Text inside Donut */}
                                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                                            {activeCourseData ? (
                                                <>
                                                    <span
                                                        className="font-mono text-xl font-bold"
                                                        style={{
                                                            color: activeCourseData.color,
                                                        }}
                                                    >
                                                        {
                                                            activeCourseData.percentage
                                                        }
                                                        %
                                                    </span>
                                                    <span className="max-w-[90px] truncate text-[11px] text-muted-foreground">
                                                        {activeCourseData.count}{' '}
                                                        students
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-2xl font-bold tracking-tight">
                                                        {totalStudents}
                                                    </span>
                                                    <span className="text-[11px] tracking-wider text-muted-foreground uppercase">
                                                        Total
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Course Legend Breakdown */}
                                    <div className="flex w-full max-w-xs flex-col gap-2.5">
                                        {donutSlices.map((slice, index) => (
                                            <div
                                                key={slice.course}
                                                className={`flex cursor-pointer items-center justify-between rounded-md p-1.5 text-xs transition-colors ${
                                                    hoveredCourseIndex === index
                                                        ? 'bg-muted font-medium'
                                                        : 'hover:bg-muted/50'
                                                }`}
                                                onMouseEnter={() =>
                                                    setHoveredCourseIndex(index)
                                                }
                                                onMouseLeave={() =>
                                                    setHoveredCourseIndex(null)
                                                }
                                            >
                                                <div className="flex items-center gap-2 truncate pr-2">
                                                    <span
                                                        className="size-2.5 shrink-0 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                slice.color,
                                                        }}
                                                    />
                                                    <span className="truncate text-foreground">
                                                        {slice.course}
                                                    </span>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-2">
                                                    <span className="font-mono text-muted-foreground">
                                                        {slice.count}
                                                    </span>
                                                    <Badge
                                                        variant="secondary"
                                                        className="h-5 px-1.5 text-[10px]"
                                                    >
                                                        {slice.percentage}%
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                                    <BookOpen className="mb-2 size-10 opacity-40" />
                                    <p className="text-sm">
                                        No course data available
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Year Level Enrollment Bar Chart */}
                    <Card className="border-sidebar-border/70 shadow-xs dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                    <Calendar className="size-4 text-primary" />
                                    Enrollment by Year Level
                                </CardTitle>
                                <CardDescription>
                                    Distribution across 1st to 4th year levels
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {yearDistribution.length > 0 ? (
                                <div className="space-y-4 pt-3">
                                    {yearDistribution.map((yearItem, index) => {
                                        const percentage = Math.round(
                                            (yearItem.count /
                                                (totalStudents || 1)) *
                                                100,
                                        );
                                        const barColors = [
                                            'bg-blue-500',
                                            'bg-emerald-500',
                                            'bg-amber-500',
                                            'bg-violet-500',
                                        ];
                                        const barColor =
                                            barColors[index % barColors.length];

                                        return (
                                            <div
                                                key={yearItem.year_level}
                                                className="space-y-1.5"
                                            >
                                                <div className="flex justify-between text-xs font-medium">
                                                    <span className="text-foreground">
                                                        {yearItem.year_level}
                                                    </span>
                                                    <span className="font-mono text-muted-foreground">
                                                        {yearItem.count}{' '}
                                                        students ({percentage}%)
                                                    </span>
                                                </div>
                                                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted/60">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                                                        style={{
                                                            width: `${Math.max(percentage, 3)}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                                    <Calendar className="mb-2 size-10 opacity-40" />
                                    <p className="text-sm">
                                        No year level data available
                                    </p>
                                </div>
                            )}
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
                                                Course & Year
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
