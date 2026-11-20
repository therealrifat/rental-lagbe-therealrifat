import React from "react";
import { Trash2, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { deleteMyEquipment } from "@/lib/actions/owner";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
const DeleteEquipment = ({
  equipment,
}: {
  equipment: {
    _id: string;
    equipmentName: string;
  };
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    console.log("delete");
    const result = await deleteMyEquipment(equipment._id);
    if (result.deletedCount > 0) {
      toast.add({
        description: "Delete Equipments Sucessfull",
      });
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            title={`Delete ${equipment.equipmentName}`}
            aria-label={`Delete ${equipment.equipmentName}`}
            className={buttonVariants({
              variant: "destructive",
              size: "icon-sm",
            })}
           
          >
            <Trash2 />
          </button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete chat?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this chat conversation. View{" "}
            <a href="#">Settings</a> delete any memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEquipment;
