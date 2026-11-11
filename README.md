## Authorization

Api has two user roles `user` and `admin`.

- `PUT /api/v1/cats/:id` – Regular users can update only their own cats. Admins can update any cat.
- `DELETE /api/v1/cats/:id` – Regular users can delete only their own cats. Admins can delete any cat.
- `PUT /api/v1/users/:id` – Users can update only their own information. Admins can update any user's information.
- `DELETE /api/v1/users/:id` – Users can delete only their own account. Admins can delete any user account.

Protected routes require a valid JWT token.
