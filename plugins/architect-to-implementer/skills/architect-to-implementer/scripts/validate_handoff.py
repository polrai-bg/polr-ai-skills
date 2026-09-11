#!/usr/bin/env python3
"""Validate the structure and basic safety of an implementation handoff."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


CORE_HEADINGS = (
    "Objective",
    "Assignment",
    "Read First",
    "Source of Truth",
    "Approved Decisions",
    "Architectural Guardrails",
    "Implementation Autonomy",
    "Scope",
    "Acceptance Criteria",
    "Verification Requirements",
    "Escalation Conditions",
    "Definition of Done",
    "Completion Handoff Requirements",
)

CORE_SUBHEADINGS = (
    "Implementer MAY Decide",
    "Implementer MUST NOT Change Without Escalation",
    "In Scope",
    "Out of Scope",
)

PLACEHOLDER_PATTERNS = (
    re.compile(r"\[(?:Describe|Define|Include|Explain|Write|Summarize)\b[^\]\n]*\](?!\()", re.IGNORECASE),
    re.compile(r"\[(?:authoritative file|approved choice|branch|decision title|Existing decision ID|Existing or new (?:AC|FR) ID|Decision ID|unresolved decision|path or identity|highest-authority source|next source|required work|explicit exclusion)\](?!\()", re.IGNORECASE),
    re.compile(r"\b(?:TODO|FIXME|INSERT HERE|FILL ME IN)\b", re.IGNORECASE),
)

SECRET_PATTERNS = (
    re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
    re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    re.compile(r"\bgh[pousr]_[A-Za-z0-9]{20,}\b"),
    re.compile(r"\bsk_(?:live|test)_[A-Za-z0-9]{12,}\b"),
    re.compile(r"\bsk-[A-Za-z0-9_-]{20,}\b"),
)

SECRET_ASSIGNMENT = re.compile(
    r"(?i)\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password|private[_-]?key|service[_-]?role[_-]?key)\b\s*[:=]\s*[`\"']?([^\s`\"']{8,})"
)


def headings(text: str) -> set[str]:
    return {
        match.group(2).strip()
        for line in text.splitlines()
        if (match := re.match(r"^(#{2,3})\s+(.+?)\s*$", line))
    }


def validate(path: Path) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []

    if not path.is_file():
        return [f"File not found: {path}"], warnings

    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        return [f"Unable to read handoff: {exc}"], warnings
    found_headings = headings(text)

    if not re.search(r"^#\s+Implementation Handoff\s*$", text, re.MULTILINE):
        errors.append("Missing top-level '# Implementation Handoff' heading.")

    for heading in CORE_HEADINGS:
        if heading not in found_headings:
            errors.append(f"Missing core section: {heading}")

    for heading in CORE_SUBHEADINGS:
        if heading not in found_headings:
            errors.append(f"Missing core subsection: {heading}")

    if not re.search(r"^#{3,4}\s+AC[-_ ]?\d+\b", text, re.MULTILINE | re.IGNORECASE):
        warnings.append("No numbered acceptance-criterion heading such as AC-01 was found.")

    if "Architecture Decisions Still Requiring Approval" not in found_headings:
        warnings.append("No unresolved-decisions section. Confirm that major decisions are settled.")

    if "Business / User Context" not in found_headings:
        warnings.append("No business or user context section. Confirm that it is genuinely irrelevant.")

    for pattern in PLACEHOLDER_PATTERNS:
        matches = pattern.findall(text)
        if matches:
            preview = ", ".join(str(item)[:80] for item in matches[:3])
            errors.append(f"Unresolved drafting placeholder found: {preview}")

    for pattern in SECRET_PATTERNS:
        match = pattern.search(text)
        if match:
            line_number = text.count("\n", 0, match.start()) + 1
            errors.append(f"Possible secret value found at line {line_number}. Remove the value.")

    for match in SECRET_ASSIGNMENT.finditer(text):
        value = match.group(1).rstrip(".,;)")
        is_reference = (
            re.fullmatch(r"[A-Z][A-Z0-9_]+", value) is not None
            or value.startswith(("${", "<", "["))
            or value.upper() in {"REDACTED", "TBD"}
        )
        if not is_reference:
            line_number = text.count("\n", 0, match.start()) + 1
            errors.append(f"Possible assigned secret value found at line {line_number}. Remove the value.")

    if len(text.split()) < 250:
        warnings.append("Handoff is under 250 words. Confirm that it is self-contained.")

    return errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("handoff", type=Path, help="Path to IMPLEMENTATION_HANDOFF.md")
    args = parser.parse_args()

    errors, warnings = validate(args.handoff)

    for warning in warnings:
        print(f"WARN: {warning}")
    for error in errors:
        print(f"ERROR: {error}")

    if errors:
        print(f"FAIL: {len(errors)} error(s), {len(warnings)} warning(s)")
        return 1

    print(f"PASS: 0 errors, {len(warnings)} warning(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
