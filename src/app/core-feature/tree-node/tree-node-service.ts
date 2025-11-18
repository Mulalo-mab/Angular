import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TreeNodeData {
  ShortDesc: string;
  GroupCode: string;
  GroupName: string;
  ID: number;
  ParentId: number | null;
  children?: TreeNodeData[];
}

export interface FlatNode {
  expandable: boolean;
  GroupName: string;
  level: number;
  checked?: boolean;
  ID: number;
}

@Injectable({
  providedIn: 'root'
})
export class TreeNodeService {
  // Pre-structured hierarchical data EXACTLY like GroceriesService
  private treeData: TreeNodeData[] = [
    
    {
      "ShortDesc": "Centurion Microbiology",
      "GroupCode": "Centurion Microbiology",
      "GroupName": "Centurion Microbiology",
      "ID": 65,
      "ParentId": null
    },
    {
      "ShortDesc": "Microbiology",
      "GroupCode": "Microbiology",
      "GroupName": "Microbiology",
      "ID": 34,
      "ParentId": null
    },
    {
      "ShortDesc": "",
      "GroupCode": "Microbiology Outsource",
      "GroupName": "Microbiology Outsource",
      "ID": 48,
      "ParentId": null
    },
    {
      "ShortDesc": "Bacon Testing",
      "GroupCode": "Bacon Testing - Burger King (Microbiological, Chemical, Physical, Sensory)",
      "GroupName": "Bacon Testing - Burger King (Microbiological, Chemical, Physical, Sensory)",
      "ID": 71,
      "ParentId": null
    },
    {
      "ShortDesc": "Metals (ICP-MS)",
      "GroupCode": "Metals (ICP-MS)",
      "GroupName": "Metals (ICP-MS)",
      "ID": 651,
      "ParentId": null
    },
    {
      "ShortDesc": "Organoleptic",
      "GroupCode": "Organoleptic",
      "GroupName": "Organoleptic",
      "ID": 241,
      "ParentId": null
    },
    {
      "ShortDesc": "Metals (ICP-OES)",
      "GroupCode": "Metals (ICP-OES)",
      "GroupName": "Metals (ICP-OES)",
      "ID": 927,
      "ParentId": null
    },
    {
      "ShortDesc": "Coliforms",
      "GroupCode": "(CEN) Coliforms",
      "GroupName": "(CEN) Coliforms",
      "ID": 1464,
      "ParentId": 65
    },
    {
      "ShortDesc": "Coliforms Sub-test",
      "GroupCode": "Coliforms Sub-test",
      "GroupName": "Coliforms Sub-test",
      "ID": 2000,
      "ParentId": 1464
    },
    {
      "ShortDesc": "Salmonella spp (per 750g)",
      "GroupCode": "(CEN) Salmonella spp (per 750g)",
      "GroupName": "(CEN) Salmonella spp (per 750g)",
      "ID": 1452,
      "ParentId": 65
    },
    {
      "ShortDesc": "Salmonella grand (per 750g)",
      "GroupCode": "Salmonella grand (per 750g)",
      "GroupName": "Salmonella grand (per 750g)",
      "ID": 2001,
      "ParentId": 1452
    },
    {
      "ShortDesc": "Bacillus cereus",
      "GroupCode": "(CEN) Bacillus cereus",
      "GroupName": "(CEN) Bacillus cereus",
      "ID": 1430,
      "ParentId": 65
    },
    {
      "ShortDesc": "Cereus",
      "GroupCode": "Bacillus cereus",
      "GroupName": "Bacillus cereus",
      "ID": 2002,
      "ParentId": 1430
    },
    {
      "ShortDesc": "Bacillus cereus (Swabs)",
      "GroupCode": "(CEN) Bacillus cereus (Swabs)",
      "GroupName": "(CEN) Bacillus cereus (Swabs)",
      "ID": 1458,
      "ParentId": 65
    },
    {
      "ShortDesc": "Swabs",
      "GroupCode": "Swabs",
      "GroupName": "Swabs",
      "ID": 2003,
      "ParentId": 1458
    },
    {
      "ShortDesc": "Clostridium perfringens",
      "GroupCode": "(CEN) Clostridium perfringens",
      "GroupName": "(CEN) Clostridium perfringens",
      "ID": 1442,
      "ParentId": 65
    },
    {
      "ShortDesc": "Clostridium perfringens (Swabs)",
      "GroupCode": "(CEN) Clostridium perfringens (Swab)",
      "GroupName": "(CEN) Clostridium perfringens (Swab)",
      "ID": 1548,
      "ParentId": 65
    },
    {
      "ShortDesc": "Coliforms (Swabs)",
      "GroupCode": "(CEN) Coliforms (Swabs)",
      "GroupName": "(CEN) Coliforms (Swabs)",
      "ID": 1463,
      "ParentId": 65
    },
    {
      "ShortDesc": "Coliforms (Water)",
      "GroupCode": "(CEN) Coliforms (Water)",
      "GroupName": "(CEN) Coliforms (Water)",
      "ID": 1489,
      "ParentId": 65
    },
    {
      "ShortDesc": "E. coli",
      "GroupCode": "(CEN) E. coli (Compact Dry)",
      "GroupName": "(CEN) E. coli (Compact Dry)",
      "ID": 1512,
      "ParentId": 65
    },
    {
      "ShortDesc": "E. coli (Swabs)",
      "GroupCode": "(CEN) E. coli (Swabs) (Compact Dry)",
      "GroupName": "(CEN) E. coli (Swabs) (Compact Dry)",
      "ID": 1513,
      "ParentId": 65
    },
    {
      "ShortDesc": "E. coli (Water)",
      "GroupCode": "(CEN) E. coli (Water)",
      "GroupName": "(CEN) E. coli (Water)",
      "ID": 1490,
      "ParentId": 65
    },
    {
      "ShortDesc": "Enterobacteriaceae",
      "GroupCode": "(CEN) Enterobacteriaceae",
      "GroupName": "(CEN) Enterobacteriaceae",
      "ID": 1465,
      "ParentId": 65
    },
    {
      "ShortDesc": "Calmonella spp",
      "GroupCode": "(CEN) Salmonella spp (per 750g)",
      "GroupName": "(CEN)",
      "ID": 1,
      "ParentId": 1464
    },
    {
      "ShortDesc": "Entero (ISO)",
      "GroupCode": "(CEN) Enterobacteriaceae (ISO)",
      "GroupName": "(CEN) Enterobacteriaceae (ISO)",
      "ID": 1445,
      "ParentId": 65
    },
    {
      "ShortDesc": "Enterobacteriaceae (Swabs)",
      "GroupCode": "(CEN) Enterobacteriaceae (Swabs)",
      "GroupName": "(CEN) Enterobacteriaceae (Swabs)",
      "ID": 1466,
      "ParentId": 65
    },
    {
      "ShortDesc": "Faecal Coliforms",
      "GroupCode": "(CEN) Faecal Coliforms",
      "GroupName": "(CEN) Faecal Coliforms",
      "ID": 1446,
      "ParentId": 65
    },
    {
      "ShortDesc": "Faecal Coliforms (Swabs)",
      "GroupCode": "(CEN) Faecal Coliforms (Swabs)",
      "GroupName": "(CEN) Faecal Coliforms (Swabs)",
      "ID": 1467,
      "ParentId": 65
    },
    {
      "ShortDesc": "Faecal Coliforms (Water)",
      "GroupCode": "(CEN) Faecal Coliforms (Water)",
      "GroupName": "(CEN) Faecal Coliforms (Water)",
      "ID": 1491,
      "ParentId": 65
    },
    {
      "ShortDesc": "Lactic Acid Bacteria",
      "GroupCode": "(CEN) Lactic Acid Bacteria",
      "GroupName": "(CEN) Lactic Acid Bacteria",
      "ID": 1447,
      "ParentId": 65
    },
    {
      "ShortDesc": "Coliforms",
      "GroupCode": "Coliforms",
      "GroupName": "Coliforms",
      "ID": 1715,
      "ParentId": 34
    },
    {
      "ShortDesc": "Listeria monocytogenes (Solus ELISA)",
      "GroupCode": "Listeria monocytogenes (Solus ELISA)",
      "GroupName": "Listeria monocytogenes (Solus ELISA)",
      "ID": 873,
      "ParentId": 34
    },
    {
      "ShortDesc": "Listeria monocytogenes (Swabs) (Solus ELISA)",
      "GroupCode": "Listeria monocytogenes (Swabs) (Solus ELISA)",
      "GroupName": "Listeria monocytogenes (Swabs) (Solus ELISA)",
      "ID": 877,
      "ParentId": 34
    },
    {
      "ShortDesc": "Entero (Animal Feed, Pet Food)",
      "GroupCode": "Enterobacteriaceae (Animal Feed, Pet Food)",
      "GroupName": "Enterobacteriaceae (Animal Feed, Pet Food)",
      "ID": 673,
      "ParentId": 34
    },
    {
      "ShortDesc": "Enterobacteriaceae",
      "GroupCode": "Enterobacteriaceae",
      "GroupName": "Enterobacteriaceae",
      "ID": 725,
      "ParentId": 34
    },
    {
      "ShortDesc": "Clostridium perfringens",
      "GroupCode": "Clostridium perfringens",
      "GroupName": "Clostridium perfringens",
      "ID": 666,
      "ParentId": 34
    },
    {
      "ShortDesc": "Yeast & Mould (Water)",
      "GroupCode": "Yeast & Mould (Water)",
      "GroupName": "Yeast & Mould (Water)",
      "ID": 781,
      "ParentId": 34
    },
    {
      "ShortDesc": "Yeast & Moulds (Swabs)",
      "GroupCode": "Yeast & Moulds (Swabs)",
      "GroupName": "Yeast & Moulds (Swabs)",
      "ID": 776,
      "ParentId": 34
    },
    {
      "ShortDesc": "Yeast & Mould (Airplates)",
      "GroupCode": "Yeast & Mould (Airplates)",
      "GroupName": "Yeast & Mould (Airplates)",
      "ID": 775,
      "ParentId": 34
    },
    {
      "ShortDesc": "Total Plate Count",
      "GroupCode": "Total Plate Count",
      "GroupName": "Total Plate Count",
      "ID": 771,
      "ParentId": 34
    },
    {
      "ShortDesc": "Total Plate Count (Airplates)",
      "GroupCode": "Total Plate Count (Airplates)",
      "GroupName": "Total Plate Count (Airplates)",
      "ID": 659,
      "ParentId": 34
    },
    {
      "ShortDesc": "Total Plate Count (Swabs)",
      "GroupCode": "Total Plate Count (Swabs)",
      "GroupName": "Total Plate Count (Swabs)",
      "ID": 772,
      "ParentId": 34
    },
    {
      "ShortDesc": "Total Plate Count (Water)",
      "GroupCode": "Total Plate Count (Water)",
      "GroupName": "Total Plate Count (Water)",
      "ID": 782,
      "ParentId": 34
    },
    {
      "ShortDesc": "Listeria spp. (Enumeration) (Food) (Nvirotek Wynla",
      "GroupCode": "Listeria spp. (Enumeration) (Food) (Nvirotek Wynland Laboratories)",
      "GroupName": "Listeria spp. (Enumeration) (Food) (Nvirotek Wynland Laboratories)",
      "ID": 808,
      "ParentId": 48
    },
    {
      "ShortDesc": "Listeria spp. (Enumeration) (Food) (Nvirotek Wynla",
      "GroupCode": "Listeria spp. (Enumeration) (Food) (Nvirotek Wynland Laboratories)",
      "GroupName": "Listeria spp.(Food) (Nvirotek Wynland Laboratories)",
      "ID": 2004,
      "ParentId": 808
    },
    {
      "ShortDesc": "Listeria monocytogenes (Swabs)- Enumeration",
      "GroupCode": "Listeria monocytogenes (Swabs) - Enumeration",
      "GroupName": "Listeria monocytogenes (Swabs) - Enumeration (Nvirotek Wynland Laboratories)",
      "ID": 899,
      "ParentId": 48
    },
    {
      "ShortDesc": "Listeria monocytogenes (Swabs)- Enumeration",
      "GroupCode": "Listeria monocytogenes (Swabs) - Enumeration",
      "GroupName": "Listeria monocytogenes (Swabs) - Enumeration (Nvirotek Wynland Laboratories)",
      "ID": 2005,
      "ParentId": 899
    },
    {
      "ShortDesc": "Listeria monocytogenes (Accelerated Shelf Life)",
      "GroupCode": "Listeria monocytogenes (Accelerated Shelf Life)",
      "GroupName": "Listeria monocytogenes (Accelerated Shelf Life) (Merieux NutriSciences)",
      "ID": 913,
      "ParentId": 48
    },
    {
      "ShortDesc": "Clostridium perfringens Enumeration (Swabs)",
      "GroupCode": "Clostridium perfringens Enumeration (Swabs)",
      "GroupName": "Clostridium perfringens Enumeration (Swabs) (Microchem)",
      "ID": 911,
      "ParentId": 48
    },
    {
      "ShortDesc": "Clostridium botulinum (SGS Vietnam)",
      "GroupCode": "Clostridium botulinum (SGS Vietnam)",
      "GroupName": "Clostridium botulinum (SGS Vietnam)",
      "ID": 786,
      "ParentId": 48
    },
    {
      "ShortDesc": "YM Shelf Life",
      "GroupCode": "Yeast & Mould (Accelerated Shelf Life) (Merieux NutriSciences)",
      "GroupName": "Yeast & Mould (Accelerated Shelf Life) (Merieux NutriSciences)",
      "ID": 918,
      "ParentId": 48
    },
    {
      "ShortDesc": "Yeast & Mould",
      "GroupCode": "Yeast & Mould (Merieux NutriSciences)",
      "GroupName": "Yeast & Mould (Merieux NutriSciences)",
      "ID": 831,
      "ParentId": 48
    },
    {
      "ShortDesc": "Vibrio Cholera",
      "GroupCode": "Vibrio Cholera",
      "GroupName": "Vibrio Cholera (Merieux NutriSciences)",
      "ID": 825,
      "ParentId": 48
    },
    {
      "ShortDesc": "Vibrio parahaemolyticus",
      "GroupCode": "Vibrio parahaemolyticus",
      "GroupName": "Vibrio parahaemolyticus (Merieux NutriSciences)",
      "ID": 827,
      "ParentId": 48
    },
    {
      "ShortDesc": "TPC (Accelerated Shelf Life)",
      "GroupCode": "Total Plate Count (Accelerated Shelf Life)",
      "GroupName": "Total Plate Count (Accelerated Shelf Life)",
      "ID": 917,
      "ParentId": 48
    },
    {
      "ShortDesc": "Moisture (Fishmeal)",
      "GroupCode": "Moisture (Fishmeal)",
      "GroupName": "Moisture (Fishmeal)",
      "ID": 22,
      "ParentId": 71
    },
    {
      "ShortDesc": "Fishmeal",
      "GroupCode": "Fishmeal",
      "GroupName": "Fishmeal",
      "ID": 25,
      "ParentId": 22
    },
    {
      "ShortDesc": "Coliforms",
      "GroupCode": "Coliforms",
      "GroupName": "Coliforms",
      "ID": 2715,
      "ParentId": 71
    },
    {
      "ShortDesc": "Coliforms",
      "GroupCode": "Coliforms",
      "GroupName": "Coliforms",
      "ID": 2006,
      "ParentId": 2715
    },
    {
      "ShortDesc": "Fat (General)",
      "GroupCode": "Fat (General)",
      "GroupName": "Fat (General)",
      "ID": 166,
      "ParentId": 71
    },
    {
      "ShortDesc": "Water Activity",
      "GroupCode": "Water Activity",
      "GroupName": "Water Activity",
      "ID": 305,
      "ParentId": 71
    },
    {
      "ShortDesc": "H20",
      "GroupCode": "H20",
      "GroupName": "H20",
      "ID": 2007,
      "ParentId": 305
    },
    {
      "ShortDesc": "Total Plate Count",
      "GroupCode": "Total Plate Count",
      "GroupName": "Total Plate Count",
      "ID": 2771,
      "ParentId": 71
    },
    {
      "ShortDesc": "Salt (Fishmeal)",
      "GroupCode": "Salt (NaCl ex Cl)",
      "GroupName": "Salt (NaCl ex Cl) (Fishmeal)",
      "ID": 18,
      "ParentId": 71
    },
    {
      "ShortDesc": "Mg (ICP-MS)",
      "GroupCode": "Magnesium (Mg) (ICP-MS)",
      "GroupName": "Magnesium (Mg) (ICP-MS)",
      "ID": 344,
      "ParentId": 651
    },
    {
      "ShortDesc": "Mg (ICP-MS)",
      "GroupCode": "Magnesium (Mg) (ICP-MS)",
      "GroupName": "(Mg) (ICP-MS)",
      "ID": 2008,
      "ParentId": 344
    },
    {
      "ShortDesc": "Li (ICP-MS)",
      "GroupCode": "Lithium (Li) (ICP-MS)",
      "GroupName": "Lithium (Li) (ICP-MS)",
      "ID": 919,
      "ParentId": 651
    },
    {
      "ShortDesc": "Li (ICP-MS)",
      "GroupCode": "Lithium (Li) (ICP-MS)",
      "GroupName": "(Li) (ICP-MS)",
      "ID": 2009,
      "ParentId": 919
    },
    {
      "ShortDesc": "Pb (ICP-MS)",
      "GroupCode": "Lead (Pb) (ICP-MS)",
      "GroupName": "Lead (Pb) (ICP-MS)",
      "ID": 336,
      "ParentId": 651
    },
    {
      "ShortDesc": "Iodine (ICP-MS)",
      "GroupCode": "Iodine (ICP-MS)",
      "GroupName": "Iodine (ICP-MS)",
      "ID": 2010,
      "ParentId": 651
    },
    {
      "ShortDesc": "Tl (ICP-MS)",
      "GroupCode": "Thallium (Tl) (ICP-MS)",
      "GroupName": "Thallium (Tl) (ICP-MS)",
      "ID": 352,
      "ParentId": 651
    },
    {
      "ShortDesc": "Sn (ICP-MS)",
      "GroupCode": "Tin (Sn) (ICP-MS)",
      "GroupName": "Tin (Sn) (ICP-MS)",
      "ID": 351,
      "ParentId": 651
    },
    {
      "ShortDesc": "Na (ICP-MS)",
      "GroupCode": "Sodium (Na) (ICP-MS)",
      "GroupName": "Sodium (Na) (ICP-MS)",
      "ID": 229,
      "ParentId": 651
    },
    {
      "ShortDesc": "K (ICP-MS)",
      "GroupCode": "Potassium (K)",
      "GroupName": "Potassium (K) (ICP-MS)",
      "ID": 204,
      "ParentId": 651
    },
    {
      "ShortDesc": "Hg (ICP-MS)",
      "GroupCode": "Mercury (Hg) (ICP-MS)",
      "GroupName": "Mercury (Hg) (ICP-MS)",
      "ID": 335,
      "ParentId": 651
    },
    {
      "ShortDesc": "Organoleptic",
      "GroupCode": "Total Defective / Broken Beans",
      "GroupName": "Total Defective / Broken Beans",
      "ID": 1129,
      "ParentId": 241
    },
    {
      "ShortDesc": "Organoleptic",
      "GroupCode": "Total Defective / Broken Beans",
      "GroupName": "Broken Beans",
      "ID": 2011,
      "ParentId": 1129
    },
    {
      "ShortDesc": "Organoleptic",
      "GroupCode": "Texture",
      "GroupName": "Texture",
      "ID": 1128,
      "ParentId": 241
    },
    {
      "ShortDesc": "Organoleptic",
      "GroupCode": "Texture",
      "GroupName": "Texture II",
      "ID": 2012,
      "ParentId": 1128
    },
    {
      "ShortDesc": "Sodium Nitrite (NaNO2)",
      "GroupCode": "Sodium Nitrite (NaNO2)",
      "GroupName": "Sodium Nitrite (NaNO2)",
      "ID": 271,
      "ParentId": 1049
    },
    {
      "ShortDesc": "Organoleptic",
      "GroupCode": "Odour",
      "GroupName": "Odour",
      "ID": 1125,
      "ParentId": 241
    },
    {
      "ShortDesc": "Sn (ICP-OES)",
      "GroupCode": "Tin (Sn) (ICP-OES)",
      "GroupName": "Tin (Sn) (ICP-OES)",
      "ID": 954,
      "ParentId": 927
    },
    {
      "ShortDesc": "Sn (ICP-OES)",
      "GroupCode": "Tin (Sn) (ICP-OES)",
      "GroupName": "Tin (ICP-OES)",
      "ID": 2013,
      "ParentId": 954
    },
    {
      "ShortDesc": "Na (ICP-OES)",
      "GroupCode": "Sodium (Na) (ICP-OES)",
      "GroupName": "Sodium (Na) (ICP-OES)",
      "ID": 951,
      "ParentId": 927
    },
    {
      "ShortDesc": "Na (ICP-OES)",
      "GroupCode": "Sodium (Na) (ICP-OES)",
      "GroupName": "(Na) (ICP-OES)",
      "ID": 2014,
      "ParentId": 951
    },
    {
      "ShortDesc": "K (ICP-OES)",
      "GroupCode": "Potassium (K) (ICP-OES)",
      "GroupName": "Potassium (K) (ICP-OES)",
      "ID": 950,
      "ParentId": 927
    }
     

  ];

  constructor() { }

  getTreeData(): Observable<TreeNodeData[]> {
    return of(this.treeData);
  }

 
}
