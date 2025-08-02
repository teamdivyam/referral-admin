import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

export default function PersonalInformationCard() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: joiResolver()
    })

    return (
        <form>
            <Card className="bg-cs-background-secondary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-500" />
                        <span>Personal Information</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                                defaultValue="Adesh Singh"
                                className="bg-cs-background-primary dark:bg-cs-background-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                defaultValue="admin@example.com"
                                type="email"
                                className="bg-cs-background-primary dark:bg-cs-background-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input
                                defaultValue="+1 (555) 123-4567"
                                type="tel"
                                className="bg-cs-background-primary dark:bg-cs-background-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Admin ID</Label>
                            <Input
                                defaultValue="ADM-1001"
                                disabled
                                className="bg-cs-background-primary dark:bg-cs-background-primary"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>
        </form>
    );
}
