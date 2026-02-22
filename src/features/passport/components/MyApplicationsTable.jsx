// MyApplicationsTable.jsx
// No "use client"; needed here

import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ← change from useRouter if using react-router
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    } from "@/components/ui/card";
    import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    } from "@/components/ui/table";
    import { Badge } from "@/components/ui/badge";
    import { Button } from "@/components/ui/button";
    import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    } from "@/components/ui/pagination";
    import { Skeleton } from "@/components/ui/skeleton";
    import { Eye } from "lucide-react";

    import { usePassportApplication } from "@/features/passport/hooks/usePassportApplication";

    export default function MyApplicationsTable({ className = "" }) {
    const navigate = useNavigate(); 

    const {
        myApplications,
        myAppsPagination,
        myAppsLoading,
        myAppsError,
        loadMyApplications,
    } = usePassportApplication();

    useEffect(() => {
        loadMyApplications(1);
    }, [loadMyApplications]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > myAppsPagination.pages) return;
        loadMyApplications(newPage);
    };

    const getStatusVariant = (status) => {
        const variants = {
        Draft: "secondary",
        SUBMITTED: "default",
        UNDER_REVIEW: "secondary",
        APPROVED: "success",
        REJECTED: "destructive",
        };
        return variants[status] || "outline";
    };

    if (myAppsLoading) {
        return (
        <Card className={className}>
            <CardHeader>
            <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
            </CardContent>
        </Card>
        );
    }

    if (myAppsError) {
        return (
        <Card className={className}>
            <CardHeader>
            <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-10 text-destructive">
            <p>{myAppsError}</p>
            <Button
                variant="outline"
                className="mt-4"
                onClick={() => loadMyApplications(1)}
            >
                Try Again
            </Button>
            </CardContent>
        </Card>
        );
    }

    return (
        <Card className={`border shadow-sm ${className}`}>
        <CardHeader>
            <CardTitle>My Passport Applications</CardTitle>
            <CardDescription>
            View and track your passport application history
            </CardDescription>
        </CardHeader>

        <CardContent>
            {myApplications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
                <p>You don't have any passport applications yet.</p>
                <Button className="mt-6" onClick={() => navigate("/passport/apply")}>
                Start New Application
                </Button>
            </div>
            ) : (
            <>
                <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead className="w-16 text-right">View</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {myApplications.map((app) => (
                        <TableRow key={app._id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">
                            {app.type || "Ordinary"}
                        </TableCell>
                        <TableCell>
                            <Badge variant={getStatusVariant(app.status)}>
                            {app.status || "Unknown"}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                            {app.submittedAt
                            ? new Date(app.submittedAt).toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                })
                            : "In Progress"}
                        </TableCell>
                        <TableCell className="text-right">
                            <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/passport/applications/${app._id}`)}
                            title="View details"
                            >
                            <Eye className="h-4 w-4" />
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>

                {myAppsPagination.pages > 1 && (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                    <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(myAppsPagination.page - 1);
                            }}
                            className={
                            myAppsPagination.page === 1
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                        />
                        </PaginationItem>

                        <PaginationItem>
                        <PaginationLink href="#" isActive>
                            {myAppsPagination.page}
                        </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(myAppsPagination.page + 1);
                            }}
                            className={
                            myAppsPagination.page === myAppsPagination.pages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                        />
                        </PaginationItem>
                    </PaginationContent>
                    </Pagination>

                    <p className="text-muted-foreground whitespace-nowrap">
                    Showing {myApplications.length} of {myAppsPagination.total}
                    </p>
                </div>
                )}
            </>
            )}
        </CardContent>
        </Card>
    );
}