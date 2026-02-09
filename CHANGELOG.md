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
- Added robust TTS stream normalization to support multiple ElevenLabs SDK response shapes (buffer, Web stream, Node stream, async iterable) before writing voice audio files.
- Added bundled ffmpeg execution path via `ffmpeg-static` for voice input conversion, removing dependency on a system-installed `ffmpeg` binary.

### Changed
- Updated message handling to map channel contexts to API message types (`dm`, `group`).
- Updated README with current setup and runtime guidance.
- Updated package metadata name to valid npm format: `syntheticsoul-discord`.
- Synced lockfile package name metadata with `package.json`.
- Updated guild message handling to preserve bot mention tokens in group messages so API-side implicit-address detection works reliably in server channels.
- Updated voice capture temp file naming from `.pcm` to `.ogg` to match the actual recorded container format.
- Hardened event dispatch execution with per-event-file `try/catch` so a single handler failure does not crash the Discord client process.

### Fixed
- Fixed command handler checks for mixed `devOnly`/`devonly` metadata.
- Fixed voice-service integration issues tied to response identity flow.
- Added fallback reply retrieval for intermittent job polling ownership/404 cases.
- Updated dynamic event binding to use `clientReady` for the `ready` event folder to avoid the Discord.js deprecation warning.
- Ensured the local audio temp directory is created before startup cleanup and voice file writes, preventing `ENOENT` on missing `src/audio`.
- Removed startup debug logging that printed `null` voice session state on boot.
- Fixed slash command reply completion behavior in DM/user-install contexts by introducing safe defer/reply helpers and applying them to auth/state commands.
- Fixed voice queue identity propagation by using user IDs consistently in voice call response enqueue/playback flows.
- Fixed voice channel idle cleanup logic by tracking connection/channel state explicitly and removing undefined variable references.
- Fixed TTS crash path caused by assuming `tts.reader` always exists (`Cannot read properties of undefined (reading 'read'/'releaseLock')`).
- Fixed voice transcription conversion failure path when `ffmpeg` is missing from `PATH` by executing the bundled static ffmpeg binary directly.
- Fixed voice-session cleanup after conversion/transcription errors to prevent stale active session state from blocking subsequent speech turns.

[unreleased]: https://github.com/chris-cozy/SyntheticSoul-Discord/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/chris-cozy/SyntheticSoul-Discord/releases/tag/v1.0.0
