#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Position, PhysicalPosition, WebviewWindow};

/// 플레이어의 실제 OS 사용자 계정명을 조회하여 제4의 벽을 뚫는 메타픽션 연출
#[tauri::command]
fn get_system_username() -> String {
    std::env::var("USERNAME")
        .or_else(|_| std::env::var("USER"))
        .unwrap_or_else(|_| "Unknown User".to_string())
}

/// 가이드 폭주 및 에러 발생 시 실제 OS 창을 진동시키는 물리적 셰이크 연출
#[tauri::command]
fn shake_window(window: WebviewWindow) {
    std::thread::spawn(move || {
        if let Ok(orig_pos) = window.outer_position() {
            let offsets = [
                (20, 0), (-20, 0), (14, 10), (-14, -10),
                (10, -5), (-10, 5), (6, 0), (-6, 0), (0, 0)
            ];
            for (dx, dy) in offsets {
                let _ = window.set_position(Position::Physical(PhysicalPosition {
                    x: orig_pos.x + dx,
                    y: orig_pos.y + dy,
                }));
                std::thread::sleep(std::time::Duration::from_millis(35));
            }
            let _ = window.set_position(Position::Physical(orig_pos));
        }
    });
}

/// 가이드의 심리에 따라 윈도우 타이틀바 메시지 동적 변경
#[tauri::command]
fn set_window_title(window: WebviewWindow, title: String) -> Result<(), String> {
    window.set_title(&title).map_err(|e| e.to_string())
}

/// 가짜 커널 패닉 시 창 상태 조작
#[tauri::command]
fn trigger_window_panic(window: WebviewWindow, fullscreen: bool) -> Result<(), String> {
    let _ = window.set_title("FATAL SYSTEM EXCEPTION // TUTO-9 CORE FAILURE");
    let _ = window.set_fullscreen(fullscreen);
    Ok(())
}

/// 스팀 도전과제 언락 스텁
#[tauri::command]
fn unlock_steam_achievement(id: String) -> Result<String, String> {
    println!("[TAURI-STEAMWORKS] Achievement Unlocked: {}", id);
    Ok(format!("Achievement {} registered", id))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_system_username,
            shake_window,
            set_window_title,
            trigger_window_panic,
            unlock_steam_achievement
        ])
        .run(tauri::generate_context!())
        .expect("error while running deceptive-guide application");
}
