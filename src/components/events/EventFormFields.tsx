import FormField from "@/components/auth/FormField";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EVENT_TYPES } from "@/lib/constants";
import type { EventFormValues } from "@/lib/types/event";
import type { EventFormErrors } from "@/lib/validation";

const typeItems = EVENT_TYPES.map((type) => ({ value: type, label: type }));

export default function EventFormFields({
    idPrefix,
    values,
    errors,
    minDate,
    onChange,
}: {
    idPrefix: string;
    values: EventFormValues;
    errors: EventFormErrors;
    minDate: string;
    onChange: (field: keyof EventFormValues, value: string) => void;
}) {
    const id = (field: keyof EventFormValues) => `${idPrefix}-${field}`;
    const aria = (field: keyof EventFormValues) => ({
        "aria-invalid": Boolean(errors[field]),
        "aria-describedby": errors[field] ? `${id(field)}-error` : undefined,
    });

    return (
        <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
                <FormField id={id("title")} label="Event title" error={errors.title}>
                    <Input
                        id={id("title")}
                        placeholder="Beach cleanup at the lake road"
                        maxLength={100}
                        value={values.title}
                        onChange={(event) => onChange("title", event.target.value)}
                        {...aria("title")}
                    />
                </FormField>
            </div>

            <FormField id={id("type")} label="Event type" error={errors.type}>
                <Select
                    value={values.type || null}
                    onValueChange={(value) => onChange("type", value ?? "")}
                    items={typeItems}
                >
                    <SelectTrigger id={id("type")} className="w-full" {...aria("type")}>
                        <SelectValue placeholder="Choose a type" />
                    </SelectTrigger>
                    <SelectContent>
                        {typeItems.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>

            <FormField id={id("date")} label="Event date" error={errors.date}>
                <Input
                    id={id("date")}
                    type="date"
                    min={minDate}
                    value={values.date}
                    onChange={(event) => onChange("date", event.target.value)}
                    {...aria("date")}
                />
            </FormField>

            <FormField id={id("location")} label="Location" error={errors.location}>
                <Input
                    id={id("location")}
                    placeholder="Where will it take place?"
                    maxLength={150}
                    value={values.location}
                    onChange={(event) => onChange("location", event.target.value)}
                    {...aria("location")}
                />
            </FormField>

            <FormField
                id={id("thumbnail")}
                label="Thumbnail image URL"
                error={errors.thumbnail}
            >
                <Input
                    id={id("thumbnail")}
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={values.thumbnail}
                    onChange={(event) => onChange("thumbnail", event.target.value)}
                    {...aria("thumbnail")}
                />
            </FormField>

            <div className="sm:col-span-2">
                <FormField
                    id={id("description")}
                    label="Description"
                    error={errors.description}
                >
                    <Textarea
                        id={id("description")}
                        rows={6}
                        maxLength={2000}
                        placeholder="Tell people what will happen and what to bring."
                        value={values.description}
                        onChange={(event) => onChange("description", event.target.value)}
                        {...aria("description")}
                    />
                    <p className="text-right text-xs text-muted-foreground">
                        {values.description.length}/2000
                    </p>
                </FormField>
            </div>
        </div>
    );
}