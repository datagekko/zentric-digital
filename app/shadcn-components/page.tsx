import { ButtonExample } from "../components/ui/examples/ButtonExample";

export default function ShadcnComponentsPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-12 space-y-4">
        <h1 className="text-hero">Shadcn Component Gallery</h1>
        <p className="text-xl">
          A showcase of available Shadcn UI components customized for Zentric Digital branding
        </p>
      </div>

      <div className="border rounded-lg p-6 mb-12">
        <ButtonExample />
      </div>

      {/* Additional components will be added here as they are created */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-h2">Usage Guide</h2>
        <p className="mt-4">
          For detailed instructions on how to use and customize these components, please refer to the{" "}
          <a 
            href="https://github.com/your-org/zentric-digital/blob/main/shadcn-usage-guide.md" 
            className="text-iris-purple hover:underline"
          >
            Shadcn Usage Guide
          </a>
          .
        </p>
      </div>
    </div>
  );
} 