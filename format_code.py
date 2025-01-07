import os
import subprocess

def format_code_in_file(file_path):
    try:
        subprocess.run(['prettier', '--write', file_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error formatting file {file_path}: {e}")
    except FileNotFoundError as e:
        print(f"Prettier not found. Please ensure Prettier is installed globally: {e}")

def format_code_in_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.js') or file.endswith('.vue'):
                file_path = os.path.join(root, file)
                format_code_in_file(file_path)

def main():
    base_dir = os.path.expanduser('~/Downloads/fineerp-2.2-register-')
    pages_dir = os.path.join(base_dir, 'pages')
    format_code_in_directory(pages_dir)
    
    print(f"Code formatting completed for all files in {pages_dir}")

if __name__ == "__main__":
    main()
