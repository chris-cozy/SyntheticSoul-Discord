# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-02-08

### Added
- Migrated Discord bot integration to current SyntheticSoulAPI v1 authenticated flow.
- Added guest session lifecycle with persisted per-user bot sessions.
- Added account commands for `guest`, `login`, `claim`, `logout`, and `session`.
- Added async message submit + job polling support for current API contracts.
- Added User Install support alongside Guild Install command sync behavior.
- Added DM-safe slash command reply handling helpers.

### Changed
- Updated message handling to map channel contexts to API message types (`dm`, `group`).
- Updated README with current setup and runtime guidance.
- Updated package metadata name to valid npm format: `syntheticsoul-discord`.
- Synced lockfile package name metadata with `package.json`.

### Fixed
- Fixed command handler checks for mixed `devOnly`/`devonly` metadata.
- Fixed voice-service integration issues tied to response identity flow.
- Added fallback reply retrieval for intermittent job polling ownership/404 cases.
- Updated dynamic event binding to use `clientReady` for the `ready` event folder to avoid the Discord.js deprecation warning.
- Ensured the local audio temp directory is created before startup cleanup and voice file writes, preventing `ENOENT` on missing `src/audio`.
- Removed startup debug logging that printed `null` voice session state on boot.

[unreleased]: https://github.com/chris-cozy/SyntheticSoul-Discord/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/chris-cozy/SyntheticSoul-Discord/releases/tag/v1.0.0
