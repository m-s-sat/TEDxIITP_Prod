import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OrgCard({ name, img }:{name:string, img:string}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }} >
      <div className="relative lg:h-[250px] md:h-[220px] sm:h-[180px] h-[90px] aspect-square rounded-xl border-[2px] sm:border-[3px] border-[#EB0028] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-red-600">
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center h-full w-full">
          <div className="relative w-[98%]">
            <Image src={img} alt={name} fill sizes="(max-width: 640px) 90px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 250px" className="object-contain object-bottom" />
          </div>
        </div>
        <div className="absolute bottom-0 left-2 sm:left-3 z-20 flex flex-col pointer-events-none max-w-[90%]">
          <h3 className="text-white font-bebas text-[12px] sm:text-[20px] md:text-[25px] lg:text-[30px] tracking-wider uppercase break-words">
            {name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}