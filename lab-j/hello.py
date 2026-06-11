import sys
from pathlib import Path

name = "Dawid"
album = "57883"
version = ".".join(map(str, sys.version_info[:3]))
current_dir = Path.cwd()

print(f"Hello {name} ({album}). This environment is using Python version {version} at location {current_dir}.")
