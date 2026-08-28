"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Funnel, Search, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ChooseExperienceLevel } from "./choose-experience-button";
import { CountrySelect } from "./ui/country-select";
import { StateSelect } from "./ui/state-select";
import { SkillButton } from "./skill-button";
import { ButtonWithLoader } from "./ui/button-with-loader";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { flattenAndSortSkills } from "@/lib/skills_sort";
import skillsLibrary from "../../public/skills_library.json";
import { useTalentStore } from "@/store/talentStore";

interface TalentSearchFilterProps {
  isLoading?: boolean;
}

export default function TalentSearchFilter({
  isLoading,
}: TalentSearchFilterProps) {
  const SKILLSET = flattenAndSortSkills(skillsLibrary);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    q,
    experience,
    country,
    state,
    skills = [],
    setFilter,
    resetFilters,
  } = useTalentStore();
  const [localFilters, setLocalFilters] = useState({
    experience,
    country,
    state,
    skills,
  });

  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const debouncedSearch = useDebounce(q, 500);

  const buildQueryString = useCallback(() => {
    const params: Record<string, string> = {};
    if (debouncedSearch) params.q = debouncedSearch;
    if (experience) params.experience = experience;
    if (country) params.country = country;
    if (state) params.state = state;
    if (skills.length) params.skills = skills.join(",");
    return new URLSearchParams(params).toString();
  }, [debouncedSearch, experience, country, state, skills]);

  useEffect(() => {
    const queryString = buildQueryString();
    router.replace(`?${queryString}`, { scroll: false });
  }, [debouncedSearch, buildQueryString, router]);

  useEffect(() => {
    const queryString = buildQueryString();
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.replace(`?${queryString}`, { scroll: false });
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [buildQueryString, router]);

  const searchParams = useSearchParams();
  useEffect(() => {
    const qParam = searchParams.get("q") || "";
    const expParam = searchParams.get("experience") || "";
    const countryParam = searchParams.get("country") || "";
    const stateParam = searchParams.get("state") || "";
    const skillsParam = searchParams.get("skills")?.split(",") || [];

    if (qParam) setFilter("q", qParam);
    if (expParam) setFilter("experience", expParam);
    if (countryParam) setFilter("country", countryParam);
    if (stateParam) setFilter("state", stateParam);
    if (skillsParam.length > 0) setFilter("skills", skillsParam);
  }, [searchParams, setFilter]);

  const handleFilter = () => {
    Object.entries(localFilters).forEach(([key, value]) => {
      setFilter(key as keyof typeof localFilters, value);
    });

    const params: Record<string, string> = {};
    if (q) params.q = q;
    if (localFilters.experience) params.experience = localFilters.experience;
    if (localFilters.country) params.country = localFilters.country;
    if (localFilters.state) params.state = localFilters.state;
    if (localFilters.skills?.length)
      params.skills = localFilters.skills.join(",");

    const queryString = new URLSearchParams(params).toString();
    router.replace(`?${queryString}`, { scroll: false });
  };

  const handleReset = () => {
    resetFilters();
    setFilter("q", "");
    setLocalFilters({
      experience: "",
      country: "",
      state: "",
      skills: [],
    });
    router.push(window.location.pathname);
  };

  useEffect(() => {
    setLocalFilters({
      experience,
      country,
      state,
      skills,
    });
  }, [q, experience, country, state, skills]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div ref={wrapperRef} className="w-full">
          <div className="relative w-full">
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {q !== "" && (
                <span
                  className="cursor-pointer text-black"
                  onClick={() => setFilter("q", "")}
                >
                  <X strokeWidth={1} size={18} />
                </span>
              )}
              <p className="hidden md:block text-muted-foreground">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 px-1.5 font-mono text-[10px] font-medium">
                  <span className="text-xs rounded bg-muted text-muted-foreground opacity-100 size-5 flex items-center justify-center">
                    ⌘
                  </span>
                  <span className="rounded bg-muted text-muted-foreground opacity-100 size-5 flex items-center justify-center">
                    F
                  </span>
                </kbd>
              </p>
            </div>
            <span
              className={`${
                q !== "" ? "hidden" : "block"
              } absolute left-3 top-1/2 -translate-y-1/2 text-[#AFAFAF]`}
            >
              <Search strokeWidth={1} size={18} />
            </span>
            <Input
              className={`w-full rounded-sm h-[42px] text-[14px] pr-10 ${
                q !== "" ? "pl-3" : "pl-8"
              }`}
              placeholder="Search by skill, job title or name"
              value={q ?? ""}
              onChange={(e) => setFilter("q", e.target.value)}
            />
          </div>
        </div>

        {/* Filter dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 focus-none rounded-[4px] text-[#09090B] text-[14px] h-[42px]"
            >
              Filter <Funnel size={14} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="rounded-[8px] gap-0 flex flex-col p-5 w-full max-w-[300px] md:max-w-[469px] shadow-lg"
          >
            <p className="flex items-center gap-2 text-[#09090B] font-medium">
              Filter by <Funnel size={16} />
            </p>
            <DropdownMenuItem className="absolute text-[#09090B] top-3 right-3">
              <X strokeWidth={2} size={16} />
            </DropdownMenuItem>
            <DropdownMenuSeparator className="mt-[16px]" />

            {/* FILTER OPTIONS */}
            <div className="flex flex-col mt-[20px] md:flex-row gap-6 text-[#696969]">
              {["skills", "experience", "location"].map((item) => {
                const isChecked = filterOptions.includes(item);
                return (
                  <div key={item} className="flex items-center gap-[10px]">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        setFilterOptions((prev) =>
                          checked
                            ? [...prev, item]
                            : prev.filter((v) => v !== item),
                        );
                      }}
                      className="size-5 border-[#CACACA] data-[state=checked]:bg-[#E5E4DE] data-[state=checked]:border-[#5F5F5F]"
                    />
                    <label className="font-medium capitalize">{item}</label>
                  </div>
                );
              })}
            </div>

            <DropdownMenuSeparator className="mt-[40px]" />

            {/* EXPERIENCE LEVEL */}
            {filterOptions.includes("experience") && (
              <div className="mt-4">
                <Label className="font-normal text-[14px]">
                  Select experience that apply
                </Label>
                <div className="flex gap-[10px] mt-1 justify-between">
                  {["entry", "intermediate", "expert"].map((lvl) => (
                    <ChooseExperienceLevel
                      key={lvl}
                      level={lvl}
                      selected={localFilters.experience === lvl}
                      onSelect={(val) =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          experience: val,
                        }))
                      }
                      className="rounded-[3px]"
                      selectedBorderClass="border-[#696969]"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* LOCATION */}
            {filterOptions.includes("location") && (
              <div className="mt-6 flex flex-col md:flex-row gap-[24px] justify-between">
                <CountrySelect
                  value={localFilters.country ?? ""}
                  onChange={(val) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      country: val,
                      state: "",
                    }))
                  }
                />
                <StateSelect
                  countryCode={localFilters.country ?? ""}
                  value={localFilters.state ?? ""}
                  onChange={(val) =>
                    setLocalFilters((prev) => ({ ...prev, state: val }))
                  }
                  disabled={!localFilters.country}
                />
              </div>
            )}

            {/* SKILLS */}
            {filterOptions.includes("skills") && (
              <div className="mt-4">
                <Label className="font-normal text-[14px]">
                  Select skills that apply
                </Label>
                <div className="flex flex-wrap gap-4 mt-1 max-h-[200px] overflow-y-scroll p-2">
                  {SKILLSET.map((skill, i) => {
                    // const selected = skills.includes(skill.value);
                    return (
                      <SkillButton
                        key={i}
                        skill={skill.label}
                        selected={localFilters.skills.includes(skill.value)}
                        onToggle={() => {
                          const selected = localFilters.skills.includes(
                            skill.value,
                          );
                          const updated = selected
                            ? localFilters.skills.filter(
                                (v) => v !== skill.value,
                              )
                            : [...localFilters.skills, skill.value];
                          setLocalFilters((prev) => ({
                            ...prev,
                            skills: updated,
                          }));
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex justify-between mt-5">
              <Button
                disabled={isLoading}
                onClick={handleReset}
                variant={"outline"}
                className="rounded-[7px]"
              >
                Reset
              </Button>
              <ButtonWithLoader
                isLoading={isLoading}
                disabled={
                  isLoading ||
                  (!localFilters.experience &&
                    !localFilters.country &&
                    !localFilters.state &&
                    (!localFilters.skills || localFilters.skills.length === 0))
                }
                variant="outline"
                className="rounded-[7px]"
                onClick={handleFilter}
              >
                Show result
              </ButtonWithLoader>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
