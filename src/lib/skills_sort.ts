type SkillOption = {
    label: string;
    value: string;
};

/**
 * Flatten grouped skill categories into a single deduplicated,
 * alphabetically sorted array of skill options.
 * 
 * @param groupedSkills - object with category keys and arrays of skill options
 * @returns flattened, deduped, sorted skill options array
 */
export function flattenAndSortSkills(
    groupedSkills: Record<string, SkillOption[]>
): SkillOption[] {
    // 1. Flatten all arrays into one
    const allSkills = Object.values(groupedSkills).flat();

    // 2. Deduplicate by 'value'
    const uniqueSkillsMap = new Map<string, SkillOption>();
    for (const skill of allSkills) {
        if (!uniqueSkillsMap.has(skill.value)) {
            uniqueSkillsMap.set(skill.value, skill);
        }
    }
    // 3. Convert map back to array and sort by label
    return Array.from(uniqueSkillsMap.values()).sort((a, b) =>
        a.label.localeCompare(b.label)
    );
}

export function getSkillLabelByValue(
    value: string,
    skillsLib: Record<string, SkillOption[]>
): string {
    for (const list of Object.values(skillsLib)) {
        const hit = list.find((skill) => skill.value === value);
        if (hit) return hit.label;
    }
    return value; // fallback if not found
}

//usage const singleLabel = getSkillLabelByValue('React', skillsLibrary);
