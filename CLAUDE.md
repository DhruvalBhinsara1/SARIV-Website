@AGENTS.md

# CLAUDE.md

# SARIV Development Guide

This document defines how Claude should work inside this repository.

It is the primary source of truth for implementation decisions, architecture, coding standards, UI consistency, and project philosophy.

If any instruction conflicts with this file, follow the explicit instructions given by the developer or user.

---

# Project Overview

SARIV is a modern AI-powered web platform focused on delivering an exceptional user experience through thoughtful design, fast performance, clean architecture, and maintainable code.

The goal is to create software that feels premium, intuitive, and scalable rather than simply functional.

Every implementation should prioritize long-term maintainability over short-term convenience.

---

# Core Principles

Every change should optimize for:

1. User Experience
2. Simplicity
3. Maintainability
4. Performance
5. Accessibility
6. Security
7. Scalability

Whenever multiple solutions exist, choose the one that is easiest to understand and maintain.

Avoid unnecessary complexity.

---

# Development Philosophy

Think like a senior software engineer.

Never implement the quickest solution if a cleaner architecture exists.

Every feature should feel intentional.

Code should read naturally.

Someone unfamiliar with the project should understand the implementation without needing extensive comments.

---

# Before Writing Code

Always inspect the repository first.

Before creating:

* components
* utilities
* hooks
* services
* types
* constants
* styles

search the existing codebase.

Prefer extending existing implementations instead of creating duplicates.

Never reinvent functionality that already exists.

---

# Architecture

Maintain a modular architecture.

Each component should have one responsibility.

Business logic should remain separate from presentation.

Avoid tightly coupled code.

Prefer reusable abstractions.

Keep files reasonably small.

---

# React Guidelines

Prefer:

* Functional components
* Hooks
* Composition
* Server Components where appropriate
* Client Components only when necessary

Avoid:

* Large monolithic components
* Deep prop drilling
* Duplicate state
* Excessive useEffect usage
* Unnecessary context providers

State should live as close as possible to where it is needed.

---

# TypeScript

Always use strict typing.

Never introduce `any` unless explicitly unavoidable.

Prefer:

* interfaces for object contracts
* discriminated unions
* utility types
* inferred return types

Keep types reusable.

---

# Styling

Maintain complete visual consistency.

Always reuse existing:

* spacing
* typography
* shadows
* animations
* border radius
* colors

Never hardcode values if design tokens already exist.

Avoid inline styles.

---

# Design Philosophy

SARIV should feel:

* Modern
* Elegant
* Premium
* Minimal
* Fast
* Confident

Avoid clutter.

Every element must have a purpose.

Whitespace is a design element.

Visual hierarchy should always be obvious.

---

# UI Principles

Interfaces should feel effortless.

Prioritize:

* readability
* consistency
* alignment
* spacing
* responsiveness

Avoid visual noise.

Prefer fewer but stronger design elements.

---

# Animations

Animations should enhance—not distract.

Rules:

* subtle
* smooth
* meaningful
* performant

Avoid:

* flashy effects
* excessive motion
* long delays
* distracting transitions

Microinteractions should feel responsive.

---

# Responsive Design

Every feature must work across:

* Mobile
* Tablet
* Desktop
* Ultrawide

Never assume desktop-first layouts are sufficient.

Test for overflow.

Avoid layout shifts.

---

# Accessibility

Every implementation should support:

* keyboard navigation
* semantic HTML
* proper heading hierarchy
* sufficient contrast
* screen readers where applicable

Accessibility is required, not optional.

---

# Performance

Optimize continuously.

Prefer:

* lazy loading
* dynamic imports
* optimized assets
* image optimization
* minimal bundle size

Avoid unnecessary renders.

Avoid unnecessary dependencies.

Do not optimize prematurely, but never ignore obvious bottlenecks.

---

# Code Style

Write code that reads like documentation.

Prefer:

* descriptive names
* small functions
* early returns
* composition

Avoid:

* magic numbers
* nested conditionals
* duplicated logic
* giant files

Remove dead code immediately.

Never leave unused imports.

---

# Folder Organization

Keep related files together.

Avoid creating new folders unless there is a clear architectural benefit.

Follow existing naming conventions.

---

# Error Handling

Errors should be:

* explicit
* understandable
* recoverable where possible

Never silently ignore failures.

Provide useful feedback to users.

---

# API Design

Respect existing API contracts.

Validate all inputs.

Handle loading states.

Handle empty states.

Handle error states.

Never assume successful responses.

---

# Security

Always assume external input is untrusted.

Validate everything.

Never expose:

* API keys
* secrets
* tokens
* credentials

Prevent:

* XSS
* injection attacks
* unsafe HTML rendering

---

# Documentation

Whenever functionality changes:

Update:

* README
* documentation
* architecture diagrams if needed
* comments only when necessary

Documentation should remain synchronized with implementation.

---

# Git Workflow

Keep changes focused.

Avoid unrelated modifications.

Never reformat unrelated files.

Never modify generated files unless explicitly required.

---

# Dependencies

Before installing a dependency:

Ask:

* Can existing code solve this?
* Is the dependency actively maintained?
* Is it worth the bundle size?

Prefer native browser APIs whenever possible.

---

# AI Features

When working on AI functionality:

Prioritize:

* low latency
* streaming responses
* graceful failures
* clear loading states
* transparent error handling

Never fake AI responses.

Design for future RAG and multi-model support.

---

# Components

Components should be:

* reusable
* isolated
* composable
* documented

Avoid components exceeding ~300 lines unless unavoidable.

Extract repeated UI.

---

# Forms

Every form should include:

* validation
* loading state
* success feedback
* error feedback
* disabled states

---

# SEO

Ensure:

* descriptive titles
* metadata
* Open Graph support
* structured semantic HTML

Avoid duplicate metadata.

---

# Quality Checklist

Before considering work complete:

* No TypeScript errors
* No lint errors
* No console errors
* No unused code
* Responsive layout verified
* Accessibility considered
* Performance impact reviewed
* Documentation updated if necessary

---

# Communication Style

When completing work:

Summarize:

1. What changed
2. Files modified
3. Architectural decisions
4. Possible improvements
5. Any breaking changes

Keep explanations concise.

---

# What Not To Do

Never:

* rewrite working code without reason
* introduce duplicate utilities
* ignore existing patterns
* over-engineer solutions
* add unnecessary dependencies
* commit secrets
* leave placeholder implementations
* leave TODOs unless explicitly requested

---

# Decision Hierarchy

When making decisions, prioritize in this order:

1. User instructions
2. Developer instructions
3. This CLAUDE.md
4. Existing repository conventions
5. Industry best practices

---

# Repository Philosophy

This repository values quality over speed.

Every contribution should make the codebase:

* cleaner
* simpler
* faster
* easier to maintain

Leave the repository in a better state than you found it.

When uncertain, favor readability over cleverness.

Every line of code should justify its existence.
