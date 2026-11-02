import { MapPin } from "lucide-react";
import type { Education } from "@/types/api";

type Props = {
    education?: Education[] | null;
    location?: string | null;
};


const CV3Education = ({ education, location }: Props) => {
    if (!education || education.length === 0) return null;

    return (

        <div className="mb-6">
            <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black ">EDUCATION</h2>

            <div className="mt-2 space-y-4">
                {education.map((edu, idx) => (
                    <div
                        key={idx}
                        className={`mb-4 ${idx !== education.length - 1 ? 'border-dashed border-b border-gray-300 pb-4' : ''}`}
                    >
                        <h3 className="text-[16px] font-semibold text-black">{edu?.degree_name || edu?.degree || 'Degree'}</h3>
                        <div className="flex flex-col gap-2 mb-2">
                            <a className="text-blue-600 text-[15px] font-bold" href="#">{edu?.university_name || edu?.school || ''}</a>
                            <div className='flex gap-6 items-center font-medium'>

                                <span className="text-[12px] flex items-center gap-1 text-gray-600"><MapPin className='w-5 h-5' /> {edu?.location || location || ''}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CV3Education;
