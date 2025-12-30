import { Checkbox } from "@/components/ui/checkbox";
import { CHECK_LIST_ITEMS } from "@/utils/constants";

/*
 * User Checklist Component.
 * Displays a list of required items or tasks for the user to complete
 * their application process (e.g. documents to upload).
 * Currently uses static data from constants.
 */
export default function CheckList() {
    
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-bold">Checklist</h2>
            <ul>
                {CHECK_LIST_ITEMS.map(item => (
                    <li key={item.id} className={`flex font-serif items-center gap-2 ${item.completed ? 'line-through text-gray-500' : ''}`}>
                        {<Checkbox checked={item.completed} className="mr-2 text-green-500" />} 
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    )
}
