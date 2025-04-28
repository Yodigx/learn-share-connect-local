
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skill } from "@/types";
import { Badge } from "@/components/ui/badge";
import { skillCategories, sampleSkills } from "@/data/mockData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface SkillSelectorProps {
  selectedSkills: Skill[];
  onChange: (skills: Skill[]) => void;
  placeholder?: string;
}

export const SkillSelector = ({ selectedSkills, onChange, placeholder = "Add skills..." }: SkillSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter out already selected skills
  const availableSkills = sampleSkills.filter(
    (skill) => !selectedSkills.some((selected) => selected.id === skill.id)
  );

  // Filter by search query
  const filteredSkills = searchQuery
    ? availableSkills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : availableSkills;

  // Group skills by category
  const groupedSkills = filteredSkills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const handleSelectSkill = (skill: Skill) => {
    onChange([...selectedSkills, skill]);
    setSearchQuery("");
  };

  const handleRemoveSkill = (skillId: string) => {
    onChange(selectedSkills.filter((skill) => skill.id !== skillId));
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search skills..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No skills found.</CommandEmpty>
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <CommandGroup key={category} heading={category}>
                  {skills.map((skill) => (
                    <CommandItem
                      key={skill.id}
                      onSelect={() => {
                        handleSelectSkill(skill);
                        setOpen(false);
                      }}
                    >
                      {skill.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedSkills.map((skill) => (
          <Badge key={skill.id} variant="secondary" className="px-3 py-1">
            {skill.name}
            <button
              className="ml-1 text-gray-500 hover:text-gray-700"
              onClick={() => handleRemoveSkill(skill.id)}
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
